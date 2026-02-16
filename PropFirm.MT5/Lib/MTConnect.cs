using System;
using System.Collections.Generic;
using System.Globalization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;

//+------------------------------------------------------------------+
//|                                             MetaTrader 5 Web API |
//|                   Copyright 2001-2019, MetaQuotes Software Corp. |
//|                                        http://www.metaquotes.net |
//+------------------------------------------------------------------+
/**
 * Create connect to MetaTrader 5 server
 */

namespace PropFirm.MT5.Lib
{
    // ----------------------------
    // Supporting stubs / helpers
    // ----------------------------
    public static class MTRetCode
    {
        public const int MT_RET_OK = 0;
        public const int MT_RET_ERR_NETWORK = 1001;
        public const int MT_RET_ERR_CONNECTION = 1002;
        public const int MT_RET_ERR_TIMEOUT = 1003;
    }

    public enum MTLoggerType { DEBUG, ERROR }

    public static class MTLogger
    {
        public static bool getIsWriteLog() => false; // set true if you want logs
        public static void write(MTLoggerType t, string msg)
        {
            // implement your logging
            // Console.WriteLine($"[{t}] {msg}");
        }
    }

    public static class MTProtocolConsts
    {
        // Replace these with the real values from your MT5 Web API constants.
        public const string WEB_CMD_AUTH_START = "AUTH_START";
        public const string WEB_CMD_AUTH_ANSWER = "AUTH_ANSWER";

        // Special parameter name used to separate body text
        public const string WEB_PARAM_BODYTEXT = "BODYTEXT";

        // Header formats (these MUST match your PHP constants)
        // In PHP: sprintf(MTProtocolConsts::WEB_PREFIX_WEBAPI, $len_query, $this->m_client_command);
        // and sprintf(MTProtocolConsts::WEB_PACKET_FORMAT, $len_query, $this->m_client_command);
        public const string WEB_PREFIX_WEBAPI = "{0:D8}{1:D8}";   // placeholder
        public const string WEB_PACKET_FORMAT = "{0:D8}{1:D8}";   // placeholder

        public const string WEB_API_WORD = "WebAPI"; // placeholder (must match your server)
    }

    public static class MTUtils
    {
        // PHP MTUtils::Quotes($value) - typically wraps/escapes
        public static string Quotes(string value)
        {
            if (value == null) return "";
            // minimal equivalent: escape quotes/backslashes and wrap in quotes
            var v = value.Replace("\\", "\\\\").Replace("\"", "\\\"");
            return "\"" + v + "\"";
        }

        // Convert hex string to raw bytes
        public static byte[] GetFromHex(string hex)
        {
            if (hex == null) throw new ArgumentNullException(nameof(hex));
            if (hex.Length % 2 != 0) throw new ArgumentException("Hex length must be even.", nameof(hex));

            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < bytes.Length; i++)
                bytes[i] = byte.Parse(hex.Substring(i * 2, 2), NumberStyles.HexNumber, CultureInfo.InvariantCulture);
            return bytes;
        }

        public static string ToHex(byte[] bytes)
        {
            var sb = new StringBuilder(bytes.Length * 2);
            foreach (var b in bytes) sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
    }

    public sealed class MTHeaderProtocol
    {
        // MUST match the protocol header length
        public const int HEADER_LENGTH = 12; // placeholder

        public int SizeBody { get; private set; }
        public int NumberPacket { get; private set; }
        public int Flag { get; private set; }

        // Parse header from raw bytes (placeholder; implement with real protocol)
        public static MTHeaderProtocol GetHeader(byte[] headerBytes)
        {
            if (headerBytes == null || headerBytes.Length != HEADER_LENGTH) return null;

            // TODO: parse according to your real MT5 header format.
            // This is ONLY a stub so the class compiles.
            return new MTHeaderProtocol
            {
                SizeBody = 0,
                NumberPacket = 0,
                Flag = 0
            };
        }
    }

    /// <summary>
    /// Your AES-256 helper. In PHP code it's MT5CryptAes256 with encryptBlock().
    /// This stub expects a 16-byte input block and returns a 16-byte output block.
    /// Implement it to match the PHP MT5CryptAes256 exactly.
    /// </summary>


    public class MTConnect : IDisposable
    {
        // 0-3FFF (0-16383) — client commands.
        public const int MAX_CLIENT_COMMAND = 16383;

        private TcpClient _client;
        private NetworkStream _stream;

        private readonly string _ipMt5;
        private readonly int _portMt5;
        private readonly int _timeoutSeconds;

        private string _cryptRand = "";
        private string[] _cryptIv; // hex strings

        private byte[] _aesOut;
        private byte[] _aesIn;

        private MT5CryptAes256 _cryptOut;
        private MT5CryptAes256 _cryptIn;

        private int _clientCommand = 0;

        public bool IsCrypt { get; }

        public MTConnect(string ipMt5, int portMt5, int timeoutConnectionSeconds, bool isCrypt)
        {
            _ipMt5 = ipMt5 ?? throw new ArgumentNullException(nameof(ipMt5));
            _portMt5 = portMt5;
            _timeoutSeconds = timeoutConnectionSeconds;
            IsCrypt = isCrypt;
        }

        public int Connect()
        {
            return CreateConnection();
        }

        public void Disconnect()
        {
            try
            {
                _stream?.Close();
                _client?.Close();
            }
            finally
            {
                _stream = null;
                _client = null;

                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, $"connection to {_ipMt5}:{_portMt5} closed");
            }
        }

        public void Dispose() => Disconnect();

        private int CreateConnection()
        {
            try
            {
                _client = new TcpClient();
                _client.SendTimeout = _timeoutSeconds * 1000;
                _client.ReceiveTimeout = _timeoutSeconds * 1000;

                var ar = _client.BeginConnect(_ipMt5, _portMt5, null, null);
                if (!ar.AsyncWaitHandle.WaitOne(TimeSpan.FromSeconds(_timeoutSeconds)))
                {
                    if (MTLogger.getIsWriteLog())
                        MTLogger.write(MTLoggerType.ERROR, $"Timeout to {_ipMt5}:{_portMt5}");
                    Disconnect();
                    return MTRetCode.MT_RET_ERR_TIMEOUT;
                }

                _client.EndConnect(ar);
                _stream = _client.GetStream();

                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, $"Connected to {_ipMt5}:{_portMt5}");

                return MTRetCode.MT_RET_OK;
            }
            catch (SocketException ex)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.ERROR, $"socket connect failed to {_ipMt5}:{_portMt5}, code: {ex.SocketErrorCode}, {ex.Message}");
                return MTRetCode.MT_RET_ERR_CONNECTION;
            }
            catch (Exception ex)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.ERROR, $"socket create/connect failed, {ex.Message}");
                return MTRetCode.MT_RET_ERR_NETWORK;
            }
        }

        public bool Send(string command, IDictionary<string, string> data, bool firstRequest = false)
        {
            if (_stream == null || !_client.Connected)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.ERROR, "connection closed");
                return false;
            }

            _clientCommand++;
            if (_clientCommand > MAX_CLIENT_COMMAND) _clientCommand = 1;

            // Build query string
            string q = command;
            string bodyRequest = "";

            if (data != null && data.Count > 0)
            {
                q += "|";
                foreach (var kv in data)
                {
                    if (string.Equals(kv.Key, MTProtocolConsts.WEB_PARAM_BODYTEXT, StringComparison.Ordinal))
                    {
                        bodyRequest = kv.Value ?? "";
                    }
                    else
                    {
                        q += kv.Key + "=" + MTUtils.Quotes(kv.Value ?? "") + "|";
                    }
                }
                q += "\r\n";
                if (!string.IsNullOrEmpty(bodyRequest)) q += bodyRequest;
            }
            else
            {
                q += "|\r\n";
            }

            // utf-8 -> utf-16le bytes (same as PHP mb_convert_encoding(..., "utf-16le", "utf-8"))
            byte[] queryBody = Encoding.Unicode.GetBytes(q); // Encoding.Unicode = UTF-16LE in .NET

            int lenQuery;
            if (command != MTProtocolConsts.WEB_CMD_AUTH_START &&
                command != MTProtocolConsts.WEB_CMD_AUTH_ANSWER &&
                IsCrypt)
            {
                queryBody = CryptPacket(queryBody, queryBody.Length, out lenQuery);
                if (queryBody == null) return false;
            }
            else
            {
                lenQuery = queryBody.Length;
            }

            string header = firstRequest
                ? string.Format(CultureInfo.InvariantCulture, MTProtocolConsts.WEB_PREFIX_WEBAPI, lenQuery, _clientCommand)
                : string.Format(CultureInfo.InvariantCulture, MTProtocolConsts.WEB_PACKET_FORMAT, lenQuery, _clientCommand);

            // PHP adds '0' + body
            byte[] headerBytes = Encoding.ASCII.GetBytes(header);
            byte[] zeroByte = new byte[] { (byte)'0' };

            byte[] packet = new byte[headerBytes.Length + 1 + lenQuery];
            Buffer.BlockCopy(headerBytes, 0, packet, 0, headerBytes.Length);
            packet[headerBytes.Length] = zeroByte[0];
            Buffer.BlockCopy(queryBody, 0, packet, headerBytes.Length + 1, lenQuery);

            if (MTLogger.getIsWriteLog())
                MTLogger.write(MTLoggerType.DEBUG, $"send data length: {packet.Length}");

            try
            {
                _stream.Write(packet, 0, packet.Length);
                return true;
            }
            catch (Exception ex)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, $"send data failed, {ex.Message}");
                return false;
            }
        }

        private byte[] CryptPacket(byte[] packetBody, int lenPacket, out int lenCryptPacket)
        {
            lenCryptPacket = 0;
            if (packetBody == null) return null;

            if (_cryptOut == null)
            {
                if (_cryptIv == null || _cryptIv.Length < 4)
                    throw new InvalidOperationException("Crypt IV not initialized. Call SetCryptRand first.");

                string keyHex = _cryptIv[0] + _cryptIv[1];
                byte[] key = MTUtils.GetFromHex(keyHex);
                _cryptOut = new MT5CryptAes256(key, key.Length);

                _aesOut = MTUtils.GetFromHex(_cryptIv[2]); // 16 bytes expected
            }

            if (_aesOut == null || _aesOut.Length == 0)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, "packet did not crypt, aes out is empty");
                return null;
            }

            byte[] result = new byte[lenPacket];
            int keyIndex = 16;

            // We must not mutate original _aesOut reference unexpectedly:
            byte[] aesOut = _aesOut;

            for (int i = 0; i < lenPacket; i++)
            {
                if (keyIndex >= 16)
                {
                    aesOut = _cryptOut.EncryptBlock(aesOut);
                    keyIndex = 0;
                }
                result[i] = (byte)(packetBody[i] ^ aesOut[keyIndex]);
                keyIndex++;
                lenCryptPacket = i + 1;
            }

            _aesOut = aesOut;

            if (MTLogger.getIsWriteLog())
                MTLogger.write(MTLoggerType.DEBUG, $"crypt length: {lenCryptPacket}");

            return result;
        }

        private byte[] DeCryptPacket(byte[] packetBody, int lenPacket)
        {
            if (packetBody == null) return null;

            if (_cryptIn == null)
            {
                if (_cryptIv == null || _cryptIv.Length < 4)
                    throw new InvalidOperationException("Crypt IV not initialized. Call SetCryptRand first.");

                string keyHex = _cryptIv[0] + _cryptIv[1];
                byte[] key = MTUtils.GetFromHex(keyHex);
                _cryptIn = new MT5CryptAes256(key, key.Length);

                _aesIn = MTUtils.GetFromHex(_cryptIv[3]);
            }

            if (_aesIn == null || _aesIn.Length == 0)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, "packet did not decrypt, aes in is empty");
                return null;
            }

            byte[] result = new byte[lenPacket];
            int keyIndex = 16;

            byte[] aesIn = _aesIn;

            for (int i = 0; i < lenPacket; i++)
            {
                if (keyIndex >= 16)
                {
                    aesIn = _cryptIn.EncryptBlock(aesIn);
                    keyIndex = 0;
                }
                result[i] = (byte)(packetBody[i] ^ aesIn[keyIndex]);
                keyIndex++;
            }

            _aesIn = aesIn;
            return result;
        }

        public string Read(bool authPacket = false, bool isBinary = false)
        {
            if (_stream == null || !_client.Connected)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.ERROR, "connection closed");
                return null;
            }

            var result = new List<byte>();

            while (true)
            {
                byte[] data = ReadPacket(out MTHeaderProtocol header);
                if (header == null) break;

                if (data == null && header.SizeBody > 0)
                {
                    if (MTLogger.getIsWriteLog())
                        MTLogger.write(MTLoggerType.DEBUG, $"read incorrect packet, length {header.SizeBody}, but data is null");
                    break;
                }

                if (IsCrypt && !authPacket && header.SizeBody > 0)
                {
                    data = DeCryptPacket(data, header.SizeBody);
                }

                if (header.NumberPacket != _clientCommand)
                {
                    if (header.SizeBody != 0)
                    {
                        if (MTLogger.getIsWriteLog())
                            MTLogger.write(MTLoggerType.DEBUG, $"number of packet incorrect need: {_clientCommand}, but get {header.NumberPacket}");
                    }
                    else
                    {
                        if (MTLogger.getIsWriteLog())
                            MTLogger.write(MTLoggerType.DEBUG, "PING packet");
                    }
                    continue;
                }

                if (data != null) result.AddRange(data);

                if (header.Flag == 0) break;
            }

            byte[] resultBytes = result.ToArray();

            if (isBinary)
            {
                int pos = Array.IndexOf(resultBytes, (byte)'\n');
                if (pos > 0)
                {
                    // first line is utf-16le, rest is binary
                    byte[] firstLine = new byte[pos];
                    Buffer.BlockCopy(resultBytes, 0, firstLine, 0, pos);
                    string firstLineStr = Encoding.Unicode.GetString(firstLine); // utf-16le -> string

                    byte[] rest = new byte[resultBytes.Length - pos];
                    Buffer.BlockCopy(resultBytes, pos, rest, 0, rest.Length);

                    return firstLineStr + "\r\n" + Encoding.Latin1.GetString(rest); // binary-ish passthrough
                }
            }

            return Encoding.Unicode.GetString(resultBytes);
        }

        private byte[] ReadPacket(out MTHeaderProtocol header)
        {
            header = null;

            byte[] headerBuf = ReadExact(MTHeaderProtocol.HEADER_LENGTH);
            if (headerBuf == null)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.ERROR, "incorrect header read");
                return null;
            }

            if (MTLogger.getIsWriteLog())
                MTLogger.write(MTLoggerType.DEBUG, $"header length: {headerBuf.Length}");

            header = MTHeaderProtocol.GetHeader(headerBuf);
            if (header == null)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, "incorrect header data");
                return null;
            }

            int needLen = header.SizeBody;
            if (needLen <= 0) return Array.Empty<byte>();

            byte[] body = ReadExact(needLen);
            if (body == null || body.Length != needLen)
            {
                if (MTLogger.getIsWriteLog())
                    MTLogger.write(MTLoggerType.DEBUG, $"incorrect size of block. Real size: {body?.Length ?? 0}, Size from header: {needLen}");
                return null;
            }

            if (MTLogger.getIsWriteLog())
                MTLogger.write(MTLoggerType.DEBUG, $"read all data {body.Length} bytes");

            return body;
        }

        private byte[] ReadExact(int count)
        {
            byte[] buffer = new byte[count];
            int offset = 0;

            while (offset < count)
            {
                int read = _stream.Read(buffer, offset, count - offset);
                if (read <= 0) return null;
                offset += read;
            }
            return buffer;
        }

        public string GetCommand(ref string answer, ref int pos)
        {
            pos = answer.IndexOf('|');
            if (pos > 0) return answer.Substring(0, pos);
            return null;
        }

        public (string name, string value)? GetNextParam(ref string answer, ref int pos, ref int posEnd)
        {
            if (posEnd < 0) posEnd = answer.IndexOf("\r\n", StringComparison.Ordinal);

            int posCode = answer.IndexOf('|', pos + 1);
            if (posCode > 0 && posCode < posEnd)
            {
                string paramsStr = answer.Substring(pos + 1, posCode - pos - 1);
                string[] parts = paramsStr.Split(new[] { '=' }, 2);
                if (parts.Length < 2) return null;

                pos = posCode;
                return (parts[0].ToUpperInvariant(), parts[1]);
            }
            return null;
        }

        public string GetJson(ref string answer, ref int pos)
        {
            int posCode = answer.IndexOf("\n", pos, StringComparison.Ordinal);
            if (posCode > 0)
            {
                string jsonStr = answer.Substring(posCode).Trim();
                pos = answer.Length;
                return jsonStr;
            }
            return null;
        }

        public string GetBinary(string answer)
        {
            int posCode = answer.IndexOf("\n", StringComparison.Ordinal);
            if (posCode > 0) return answer.Substring(posCode);
            return null;
        }

        public static int GetRetCode(string retCodeString)
        {
            if (string.IsNullOrEmpty(retCodeString)) return 0;
            string[] p = retCodeString.Split(new[] { ' ' }, 2);
            return int.TryParse(p[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out int code) ? code : 0;
        }

        public void SetCryptRand(string crypt, string password)
        {
            _cryptRand = crypt ?? "";
            _cryptIv = new string[16];

            // PHP:
            // $out = md5(md5(utf16le(password), true) . WEB_API_WORD);
            byte[] passUtf16 = Encoding.Unicode.GetBytes(password ?? "");
            byte[] inner = MD5.HashData(passUtf16);                 // md5(..., true) => raw bytes
            byte[] apiWordBytes = Encoding.ASCII.GetBytes(MTProtocolConsts.WEB_API_WORD);
            byte[] concat = new byte[inner.Length + apiWordBytes.Length];
            Buffer.BlockCopy(inner, 0, concat, 0, inner.Length);
            Buffer.BlockCopy(apiWordBytes, 0, concat, inner.Length, apiWordBytes.Length);
            string outHex = MTUtils.ToHex(MD5.HashData(concat));    // md5(...) => hex string

            for (int i = 0; i < 16; i++)
            {
                string randPartHex = _cryptRand.Substring(i * 32, 32);
                byte[] randPart = MTUtils.GetFromHex(randPartHex);
                byte[] outBytes = MTUtils.GetFromHex(outHex);

                byte[] mix = new byte[randPart.Length + outBytes.Length];
                Buffer.BlockCopy(randPart, 0, mix, 0, randPart.Length);
                Buffer.BlockCopy(outBytes, 0, mix, randPart.Length, outBytes.Length);

                outHex = MTUtils.ToHex(MD5.HashData(mix));
                _cryptIv[i] = outHex;
            }

            // reset streams so new IV takes effect
            _cryptOut = null; _cryptIn = null;
            _aesOut = null; _aesIn = null;
        }
    }
}

