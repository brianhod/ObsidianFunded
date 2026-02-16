using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.MT5.Lib
{
    using System;
    using System.Net.Http;
    using System.Security.Cryptography;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;

    namespace Tarikh.PhpMeta.Lib
    {
        public class CMT5Request : IDisposable
        {
            private HttpClient _httpClient;
            private string _server = "";

            public bool Init(string server)
            {
                Shutdown();

                if (string.IsNullOrEmpty(server))
                    return false;

                var handler = new HttpClientHandler
                {
                    // Comment out this line if you use self-signed certificates
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true,
                    MaxConnectionsPerServer = 1
                };

                _httpClient = new HttpClient(handler);
                _httpClient.DefaultRequestHeaders.Add("Connection", "Keep-Alive");

                _server = server;

                return true;
            }

            public void Shutdown()
            {
                _httpClient?.Dispose();
                _httpClient = null;
            }

            public async Task<string> PostAsync(string path, string body)
            {
                if (_httpClient == null)
                    return null;

                try
                {
                    var content = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");
                    var response = await _httpClient.PostAsync($"https://{_server}{path}", content);

                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"POST error code: {(int)response.StatusCode}");
                        return null;
                    }

                    return await response.Content.ReadAsStringAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"POST error: {ex.Message}");
                    return null;
                }
            }

            public async Task<bool> AuthAsync(string login, string password, string build, string agent)
            {
                if (_httpClient == null)
                    return false;

                // Send auth start
                string path = $"/api/auth/start?version={build}&agent={agent}&login={login}&type=manager";
                string result = await GetAsync(path);

                if (string.IsNullOrEmpty(result))
                    return false;

                var authStartAnswer = JsonSerializer.Deserialize<AuthStartResponse>(result);

                if (authStartAnswer.retcode != 0)
                {
                    Console.WriteLine($"Auth start error: {authStartAnswer.retcode}");
                    return false;
                }

                // Getting code from the hex string
                byte[] srvRand = HexToBytes(authStartAnswer.srv_rand);

                // Hash for the response
                byte[] passwordBytes = Encoding.Unicode.GetBytes(password);
                byte[] passwordHash = MD5.HashData(passwordBytes);
                byte[] passwordHashWithSuffix = CombineBytes(passwordHash, Encoding.UTF8.GetBytes("WebAPI"));

                byte[] passwordHashMd5 = MD5.HashData(passwordHashWithSuffix);
                byte[] srvRandAnswerBytes = CombineBytes(passwordHashMd5, srvRand);
                string srvRandAnswer = BytesToHex(MD5.HashData(srvRandAnswerBytes));

                // Random string for the MetaTrader 5 server
                byte[] cliRandBuf = new byte[16];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(cliRandBuf);
                }
                string cliRand = BytesToHex(cliRandBuf);

                // Sending the response
                path = $"/api/auth/answer?srv_rand_answer={srvRandAnswer}&cli_rand={cliRand}";
                result = await GetAsync(path);

                if (string.IsNullOrEmpty(result))
                    return false;

                var authAnswerAnswer = JsonSerializer.Deserialize<AuthAnswerResponse>(result);

                if (authAnswerAnswer.retcode != 0)
                {
                    Console.WriteLine($"Auth answer error: {authAnswerAnswer.retcode}");
                    return false;
                }

                // Calculating a correct server response for the random client sequence
                byte[] cliRandAnswerBytes = CombineBytes(passwordHashMd5, cliRandBuf);
                string cliRandAnswer = BytesToHex(MD5.HashData(cliRandAnswerBytes));

                if (cliRandAnswer != authAnswerAnswer.cli_rand_answer)
                {
                    Console.WriteLine("Auth answer error: invalid client answer");
                    return false;
                }

                return true;
            }

            public async Task<string> GetAsync(string path, string body = null)
            {
                if (_httpClient == null)
                    return null;

                try
                {
                    HttpResponseMessage response;

                    if (!string.IsNullOrEmpty(body))
                    {
                        var content = new StringContent(body, Encoding.UTF8);
                        var request = new HttpRequestMessage(HttpMethod.Get, $"https://{_server}{path}")
                        {
                            Content = content
                        };
                        response = await _httpClient.SendAsync(request);
                    }
                    else
                    {
                        response = await _httpClient.GetAsync($"https://{_server}{path}");
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"GET error code: {(int)response.StatusCode}");
                        return null;
                    }

                    return await response.Content.ReadAsStringAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"GET error: {ex.Message}");
                    return null;
                }
            }

            // Helper methods
            private byte[] HexToBytes(string hex)
            {
                int length = hex.Length;
                byte[] bytes = new byte[length / 2];
                for (int i = 0; i < length; i += 2)
                {
                    bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
                }
                return bytes;
            }

            private string BytesToHex(byte[] bytes)
            {
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }

            private byte[] CombineBytes(byte[] first, byte[] second)
            {
                byte[] result = new byte[first.Length + second.Length];
                Buffer.BlockCopy(first, 0, result, 0, first.Length);
                Buffer.BlockCopy(second, 0, result, first.Length, second.Length);
                return result;
            }

            public void Dispose()
            {
                Shutdown();
            }

            // Response classes for JSON deserialization
            private class AuthStartResponse
            {
                public int retcode { get; set; }
                public string srv_rand { get; set; }
            }

            private class AuthAnswerResponse
            {
                public int retcode { get; set; }
                public string cli_rand_answer { get; set; }
            }
        }
    }
}
