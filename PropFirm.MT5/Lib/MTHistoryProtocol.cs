//using PropFirm.MT5.Lib;
//using System;
//using System.Collections.Generic;

////+------------------------------------------------------------------+
////|                                             MetaTrader 5 Web API |
////|                   Copyright 2001-2019, MetaQuotes Software Corp. |
////|                                        http://www.metaquotes.net |
////+------------------------------------------------------------------+


//namespace PropFirm.MT5.Lib
//{
//    /// <summary>
//    /// Class get history
//    /// </summary>
//    public sealed class MTHistoryProtocol
//    {
//        private readonly MTConnect _connect; // connection to MT5 server

//        /// <summary>
//        /// MTConnect - connect to MT5 server
//        /// </summary>
//        public MTHistoryProtocol(MTConnect connect)
//        {
//            _connect = connect ?? throw new ArgumentNullException(nameof(connect));
//        }

//        /// <summary>
//        /// Get deal/order by ticket from history
//        /// </summary>
//        /// <param name="ticket">ticket</param>
//        /// <param name="history">MTOrder result</param>
//        /// <returns>MTRetCode</returns>
//        public MTRetCode HistoryGet(long ticket, out MTOrder? history)
//        {
//            history = null;

//            //--- send request
//            var data = new Dictionary<string, string>
//            {
//                [MTProtocolConsts.WEB_PARAM_TICKET] = ticket.ToString()
//            };

//            if (!_connect.Send(MTProtocolConsts.WEB_CMD_HISTORY_GET, data))
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "send history get failed");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            //--- get answer
//            var answer = _connect.Read();
//            if (answer == null)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "answer history get is empty");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            //--- parse answer
//            var parseCode = ParseHistory(MTProtocolConsts.WEB_CMD_HISTORY_GET, answer, out var historyAnswer);
//            if (parseCode != MTRetCode.MT_RET_OK)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, $"parse history get failed: [{parseCode}] {MTRetCode.GetError(parseCode)}");
//                return parseCode;
//            }

//            //--- get object from json
//            history = historyAnswer.GetFromJson();
//            return MTRetCode.MT_RET_OK;
//        }

//        /// <summary>
//        /// Get total history for login in range
//        /// </summary>
//        public MTRetCode HistoryGetTotal(string login, long from, long to, out int total)
//        {
//            total = 0;

//            var data = new Dictionary<string, string>
//            {
//                [MTProtocolConsts.WEB_PARAM_LOGIN] = login,
//                [MTProtocolConsts.WEB_PARAM_FROM] = from.ToString(),
//                [MTProtocolConsts.WEB_PARAM_TO] = to.ToString()
//            };

//            if (!_connect.Send(MTProtocolConsts.WEB_CMD_HISTORY_GET_TOTAL, data))
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "send history get total failed");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            var answer = _connect.Read();
//            if (answer == null)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "answer history get total is empty");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            var parseCode = ParseHistoryTotal(answer, out var historyAnswer);
//            if (parseCode != MTRetCode.MT_RET_OK)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, $"parse history get total failed: [{parseCode}] {MTRetCode.GetError(parseCode)}");
//                return parseCode;
//            }

//            total = historyAnswer.Total;
//            return MTRetCode.MT_RET_OK;
//        }

//        /// <summary>
//        /// Get histories page (slice) for login in range
//        /// </summary>
//        public MTRetCode HistoryGetPage(string login, long from, long to, int offset, int total, out List<MTOrder>? histories)
//        {
//            histories = null;

//            var data = new Dictionary<string, string>
//            {
//                [MTProtocolConsts.WEB_PARAM_LOGIN] = login,
//                [MTProtocolConsts.WEB_PARAM_FROM] = from.ToString(),
//                [MTProtocolConsts.WEB_PARAM_TO] = to.ToString(),
//                [MTProtocolConsts.WEB_PARAM_OFFSET] = offset.ToString(),
//                [MTProtocolConsts.WEB_PARAM_TOTAL] = total.ToString()
//            };

//            if (!_connect.Send(MTProtocolConsts.WEB_CMD_HISTORY_GET_PAGE, data))
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "send history get page failed");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            var answer = _connect.Read();
//            if (answer == null)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, "answer history get page is empty");
//                return MTRetCode.MT_RET_ERR_NETWORK;
//            }

//            var parseCode = ParseHistoryPage(answer, out var historyAnswer);
//            if (parseCode != MTRetCode.MT_RET_OK)
//            {
//                if (MTLogger.getIsWriteLog())
//                    MTLogger.write(MTLoggerType.ERROR, $"parse history get page failed: [{parseCode}] {MTRetCode.GetError(parseCode)}");
//                return parseCode;
//            }

//            histories = historyAnswer.GetArrayFromJson();
//            return MTRetCode.MT_RET_OK;
//        }

//        /// <summary>
//        /// Check answer from MetaTrader 5 server for HISTORY_GET (single record)
//        /// </summary>
//        private MTRetCode ParseHistory(string command, string answer, out MTHistoryAnswer historyAnswer)
//        {
//            historyAnswer = new MTHistoryAnswer();
//            int pos = 0;

//            //--- get command answer
//            string commandReal = _connect.GetCommand(answer, ref pos);
//            if (!string.Equals(commandReal, command, StringComparison.Ordinal))
//                return MTRetCode.MT_RET_ERR_DATA;

//            //--- get param
//            int posEnd = -1;
//            MTConnect.Param? param;
//            while ((param = _connect.GetNextParam(answer, ref pos, ref posEnd)) != null)
//            {
//                switch (param.Value.Name)
//                {
//                    case MTProtocolConsts.WEB_PARAM_RETCODE:
//                        historyAnswer.RetCode = param.Value.Value;
//                        break;
//                }
//            }

//            //--- check ret code
//            var retCode = MTConnect.GetRetCode(historyAnswer.RetCode);
//            if (retCode != MTRetCode.MT_RET_OK)
//                return retCode;

//            //--- get json
//            historyAnswer.ConfigJson = _connect.GetJson(answer, posEnd);
//            if (historyAnswer.ConfigJson == null)
//                return MTRetCode.MT_RET_REPORT_NODATA;

//            return MTRetCode.MT_RET_OK;
//        }

//        /// <summary>
//        /// Check answer from MetaTrader 5 server for HISTORY_GET_PAGE
//        /// </summary>
//        private MTRetCode ParseHistoryPage(string answer, out MTHistoryPageAnswer historyAnswer)
//        {
//            historyAnswer = new MTHistoryPageAnswer();
//            int pos = 0;

//            string commandReal = _connect.GetCommand(answer, ref pos);
//            if (!string.Equals(commandReal, MTProtocolConsts.WEB_CMD_HISTORY_GET_PAGE, StringComparison.Ordinal))
//                return MTRetCode.MT_RET_ERR_DATA;

//            int posEnd = -1;
//            MTConnect.Param? param;
//            while ((param = _connect.GetNextParam(answer, ref pos, ref posEnd)) != null)
//            {
//                switch (param.Value.Name)
//                {
//                    case MTProtocolConsts.WEB_PARAM_RETCODE:
//                        historyAnswer.RetCode = param.Value.Value;
//                        break;
//                }
//            }

//            var retCode = MTConnect.GetRetCode(historyAnswer.RetCode);
//            if (retCode != MTRetCode.MT_RET_OK)
//                return retCode;

//            historyAnswer.ConfigJson = _connect.GetJson(answer, posEnd);
//            if (historyAnswer.ConfigJson == null)
//                return MTRetCode.MT_RET_REPORT_NODATA;

//            return MTRetCode.MT_RET_OK;
//        }

//        /// <summary>
//        /// Check answer from MetaTrader 5 server for HISTORY_GET_TOTAL
//        /// </summary>
//        private MTRetCode ParseHistoryTotal(string answer, out MTHistoryTotalAnswer historyAnswer)
//        {
//            historyAnswer = new MTHistoryTotalAnswer();
//            int pos = 0;

//            string command = _connect.GetCommand(answer, ref pos);
//            if (!string.Equals(command, MTProtocolConsts.WEB_CMD_HISTORY_GET_TOTAL, StringComparison.Ordinal))
//                return MTRetCode.MT_RET_ERR_DATA;

//            int posEnd = -1;
//            MTConnect.Param? param;
//            while ((param = _connect.GetNextParam(answer, ref pos, ref posEnd)) != null)
//            {
//                switch (param.Value.Name)
//                {
//                    case MTProtocolConsts.WEB_PARAM_RETCODE:
//                        historyAnswer.RetCode = param.Value.Value;
//                        break;

//                    case MTProtocolConsts.WEB_PARAM_TOTAL:
//                        if (int.TryParse(param.Value.Value, out var t))
//                            historyAnswer.Total = t;
//                        break;
//                }
//            }

//            var retCode = MTConnect.GetRetCode(historyAnswer.RetCode);
//            if (retCode != MTRetCode.MT_RET_OK)
//                return retCode;

//            return MTRetCode.MT_RET_OK;
//        }
//    }

//    /// <summary>
//    /// Answer on request history_get_total
//    /// </summary>
//    public sealed class MTHistoryTotalAnswer
//    {
//        public string RetCode { get; set; } = "-1";
//        public int Total { get; set; } = 0;
//    }

//    /// <summary>
//    /// get history page answer
//    /// </summary>
//    public sealed class MTHistoryPageAnswer
//    {
//        public string RetCode { get; set; } = "-1";
//        public string? ConfigJson { get; set; } = string.Empty;

//        /// <summary>
//        /// From json get array of MTOrder
//        /// </summary>
//        public List<MTOrder>? GetArrayFromJson()
//        {
//            var objects = MTJson.Decode(ConfigJson);
//            if (objects == null) return null;

//            var result = new List<MTOrder>();
//            foreach (var obj in objects)
//            {
//                var info = MTOrderJson.GetFromJson(obj);
//                result.Add(info);
//            }
//            return result;
//        }
//    }

//    /// <summary>
//    /// get history answer (single object)
//    /// </summary>
//    public sealed class MTHistoryAnswer
//    {
//        public string RetCode { get; set; } = "-1";
//        public string? ConfigJson { get; set; } = string.Empty;

//        /// <summary>
//        /// From json get MTOrder
//        /// </summary>
//        public MTOrder? GetFromJson()
//        {
//            var obj = MTJson.DecodeObject(ConfigJson);
//            if (obj == null) return null;
//            return MTOrderJson.GetFromJson(obj);
//        }
//    }

//    // ---------------------------------------------------------------------
//    // NOTE:
//    // The following types are assumed to exist in your project, equivalent
//    // to the PHP library you started from:
//    //   - MTConnect (Send/Read/GetCommand/GetNextParam/GetJson/GetRetCode)
//    //   - MTProtocolConsts (command/param const strings)
//    //   - MTRetCode (enum + GetError)
//    //   - MTLogger / MTLoggerType
//    //   - MTJson (Decode/DecodeObject)
//    //   - MTOrder / MTOrderJson
//    //
//    // This file focuses on converting the provided PHP history protocol code.
//    // ---------------------------------------------------------------------
//}

