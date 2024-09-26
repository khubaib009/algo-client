
const Equity = [
    {
        sectionTitle: "Equity 1 Information",
        fields: [
            { label: "Symbol", type: "text", id: "symbol_eq_1", name: "symbol_eq_1", defaultValue: "AAPL" },
            { label: "Security Type", type: "select", id: "securityType_eq_1", name: "security_type_eq_1", options: ["STK", "ETF", "FUT"], defaultValue: "STK" },
            { label: "Exchange", type: "text", id: "exchange_eq_1", name: "exchange_eq_1", defaultValue: "CHX" },
            { label: "Currency", type: "text", id: "currency_eq_1", name: "currency_eq_1", defaultValue: "USD" },
            { label: "Last Trade Date", type: "text", id: "lastTradeDate_eq_1", name: "last_trade_date_or_contract_month_eq_1", defaultValue: "20231020" },
            { label: "End Time", type: "text", id: "endTime_eq_1", name: "end_time_eq_1", defaultValue: "20230925 15:00:00 UTC" },
            { label: "Duration", type: "select", id: "duration_eq_1", name: "duration_eq_1", options: ["1 D", "5 D", "10 D"], defaultValue: "1 D" },
            { label: "Bar Size", type: "select", id: "barSize_eq_1", name: "bar_size_eq_1", options: ["1 min", "5 mins"], defaultValue: "1 min" },
            { label: "Show", type: "text", id: "show_eq_1", name: "show_eq_1", defaultValue: "TRADES" },
        ],
    },
    {
        sectionTitle: "Equity 2 Information",
        fields: [
            { label: "Symbol", type: "text", id: "symbol_eq_2", name: "symbol_eq_2", defaultValue: "AAPL" },
            { label: "Security Type", type: "select", id: "securityType_eq_2", name: "security_type_eq_2", options: ["STK", "ETF", "FUT"], defaultValue: "STK" },
            { label: "Exchange", type: "text", id: "exchange_eq_2", name: "exchange_eq_2", defaultValue: "NYSE" },
            { label: "Currency", type: "text", id: "currency_eq_2", name: "currency_eq_2", defaultValue: "USD" },
            { label: "Last Trade Date", type: "text", id: "lastTradeDate_eq_2", name: "last_trade_date_or_contract_month_eq_2", defaultValue: "20231020" },
            { label: "End Time", type: "text", id: "endTime_eq_2", name: "end_time_eq_2", defaultValue: "20230925 15:00:00 UTC" },
            { label: "Duration", type: "select", id: "duration_eq_2", name: "duration_eq_2", options: ["1 D", "5 D", "10 D"], defaultValue: "1 D" },
            { label: "Bar Size", type: "select", id: "barSize_eq_2", name: "bar_size_eq_2", options: ["1 min", "5 mins"], defaultValue: "1 min" },
            { label: "Show", type: "text", id: "show_eq_2", name: "show_eq_2", defaultValue: "TRADES" },
        ],
    },
];

const FactorBalancing = [
   {
    fields: [
        { label: "Symbol", type: "text", id: "symbol_eq_2", name: "symbol_eq_2", defaultValue: "AAPL" },
        { label: "Name", type: "text", id: "name_eq_2", name: "name_eq_2", defaultValue: "string" },
        { label: "Active", type: "select", id: "active_eq_2", name: "active_eq_2", options: ["True", "False"],defaultValue: "true" },
        { label: "Parameters", type: "text", id: "parameters_eq_2", name: "parameters_eq_2", defaultValue: "" },
        { label: "Start date", type: "date", id: "start_date_eq_2", name: "start_date_eq_2", defaultValue: "2020-01-01" },
        { label: "End date", type: "date", id: "enddate_eq_2", name: "enddate_eq_2", defaultValue: "2023-01-31" },
        { label: "Alpha", type: "number", id: "alpha_eq_2", name: "alpha_eq_2", defaultValue: "0.05" },
        { label: "Balanced", type: "number", id: "balanced_eq_2", name: "balanced_eq_2", defaultValue: "0.75" },
        { label: "Moment", type: "number", id: "moment_eq_2", name: "moment_eq_2", defaultValue: "0.20" },
    ]
}
]

const Metal = [
    {
        sectionTitle: "Metal 1 Information",
        fields: [
            { label: "Symbol", type: "text", id: "symbol_metal_1", name: "symbol_metal_1", defaultValue: "SI" },
            { label: "Security Type", type: "select", id: "securityType_metal_1", name: "security_type_metal_1", options: ["STK", "ETF", "FUT"], defaultValue: "STK" },
            { label: "Exchange", type: "text", id: "exchange_metal_1", name: "exchange_metal_1", defaultValue: "COMEX" },
            { label: "Currency", type: "text", id: "currency_metal_1", name: "currency_metal_1", defaultValue: "USD" },
            { label: "Last Trade Date", type: "text", id: "lastTradeDate_metal_1", name: "last_trade_date_or_contract_month_metal_1", defaultValue: "20231227" },
            { label: "End Time", type: "text", id: "endTime_metal_1", name: "end_time_metal_1", defaultValue: "20230925 15:00:00 UTC" },
            { label: "Duration", type: "select", id: "duration_metal_1", name: "duration_metal_1", options: ["1 D", "2 D", "5 D", "10 D", "29 D"], defaultValue: "1 D" },
            { label: "Bar Size", type: "select", id: "barSize_metal_1", name: "bar_size_metal_1", options: ["5 secs", "15 secs", "30 secs", "1 min", "5 mins", "15 mins", "30 mins"], defaultValue: "5 secs" },
            { label: "Show", type: "text", id: "show_metal_1", name: "show_metal_1", defaultValue: "TRADES" },
        ],
    },
    {
        sectionTitle: "Metal 2 Information",
        fields: [
            { label: "Symbol", type: "text", id: "symbol_metal_2", name: "symbol_metal_2", defaultValue: "GC" },
            { label: "Security Type", type: "select", id: "securityType_metal_2", name: "security_type_metal_2", options: ["STK", "ETF", "FUT"], defaultValue: "STK" },
            { label: "Exchange", type: "text", id: "exchange_metal_2", name: "exchange_metal_2", defaultValue: "COMEX" },
            { label: "Currency", type: "text", id: "currency_metal_2", name: "currency_metal_2", defaultValue: "USD" },
            { label: "Last Trade Date", type: "text", id: "lastTradeDate_metal_2", name: "last_trade_date_or_contract_month_metal_2", defaultValue: "20231227" },
            { label: "End Time", type: "text", id: "endTime_metal_2", name: "end_time_metal_2", defaultValue: "20230925 15:00:00 UTC" },
            { label: "Duration", type: "select", id: "duration_metal_2", name: "duration_metal_2", options: ["1 D", "2 D", "5 D", "10 D", "29 D"], defaultValue: "1 D" },
            { label: "Bar Size", type: "select", id: "barSize_metal_2", name: "bar_size_metal_2", options: ["5 secs", "15 secs", "30 secs", "1 min", "5 mins", "15 mins", "30 mins"], defaultValue: "5 secs" },
            { label: "Show", type: "text", id: "show_metal_2", name: "show_metal_2", defaultValue: "TRADES" },
        ],
    },
    { label: "Historical Average Ticks", type: "text", id: "metal_historicalAverageTicks", name: "metal_historical_average_ticks", defaultValue: "20" },
    { label: "Favourable Trend Check", type: "text", id: "metal_favour_trend_check", name: "metal_favour_trend_check", defaultValue: "13" },
];

const Reversal = [
    {
        sectionTitle: "Reversal Information",
        fields: [
            {
                label: "Symbol:",
                type: "text",
                id: "symbol3",
                name: "symbol",
                defaultValue: "CL",
            },
            {
                label: "Security Type:",
                type: "select",
                id: "securityType3",
                name: "security_type",
                options: ["FUT", "STK"],
                defaultValue: "FUT",
            },
            {
                label: "Exchange:",
                type: "text",
                id: "exchange3",
                name: "exchange",
                defaultValue: "NYMEX",
            },
            {
                label: "Currency:",
                type: "text",
                id: "currency3",
                name: "currency",
                defaultValue: "USD",
            },
            {
                label: "Last Trade Date:",
                type: "text",
                id: "lastTradeDate3",
                name: "last_trade_date",
                defaultValue: "20231020",
            },
            {
                label: "End Time:",
                type: "text",
                id: "endTime3",
                name: "end_time",
                defaultValue: "20230925 15:00:00 UTC",
            },
            {
                label: "Duration:",
                type: "select",
                id: "duration3",
                name: "duration",
                options: ["1 D", "2 D", "5 D", "10 D", "29 D"],
                defaultValue: "5 D",
            },
            {
                label: "Bar Size:",
                type: "select",
                id: "barSize3",
                name: "bar_size",
                options: ["5 secs", "15 secs", "30 secs", "1 min", "5 mins", "15 mins", "30 mins"],
                defaultValue: "5 mins",
            },
            {
                label: "Show:",
                type: "text",
                id: "show3",
                name: "show",
                defaultValue: "TRADES",
            },
            {
                label: "History Average Volume Check:",
                type: "text",
                id: "history_average3",
                name: "history_average",
                defaultValue: 150,
            },
            {
                label: "Risk Reward:",
                type: "text",
                id: "riskReward3",
                name: "risk_reward",
                defaultValue: 1.5,
            },
            {
                label: "Opp Trend Check:",
                type: "text",
                id: "oppTrendCheck3",
                name: "opp_trend_check",
                defaultValue: 3,
            },
            {
                label: "Volume Check:",
                type: "text",
                id: "volumeCheck3",
                name: "volume_check",
                defaultValue: 50,
            },
            {
                label: "Historical Average Ticks:",
                type: "text",
                id: "historicalAverageTicks3",
                name: "historical_average_ticks",
                defaultValue: 20,
            },
            {
                label: "Favourable Trend Check:",
                type: "text",
                id: "favour_trend_check",
                name: "favour_trend_check",
                defaultValue: 12,
            },
            {
                label: "Bull Trend Check:",
                type: "text",
                id: "difference_check_trend_bull",
                name: "difference_check_trend_bull",
                defaultValue: 0.4,
            },
            {
                label: "Bear Trend Check:",
                type: "text",
                id: "difference_check_trend_bear",
                name: "difference_check_trend_bear",
                defaultValue: -0.3,
            }]
    }
]
    ;
const Arbitrage = [
    {
        sectionTitle: "Arbitrage Information",
        fields: [
            {
                label: "Symbol:",
                type: "text",
                id: "arbitrageSymbol",
                name: "contract_1[symbol]",
                defaultValue: "CL",
            },
            {
                label: "Security Type:",
                type: "select",
                id: "contract1SecurityType",
                name: "contract_1[security_type]",
                options: ["FUT", "STK"],
                defaultValue: "FUT",
            },
            {
                label: "Exchange:",
                type: "text",
                id: "contract1Exchange",
                name: "contract_1[exchange]",
                defaultValue: "NYMEX",
            },
            {
                label: "Currency:",
                type: "text",
                id: "contract1Currency",
                name: "contract_1[currency]",
                defaultValue: "USD",
            },
            {
                label: "Last Trade Date:",
                type: "text",
                id: "contract1lastTradeDate",
                name: "contract_1[last_trade_date_or_contract_month]",
                defaultValue: "20231120",
            },
            {
                label: "End Time:",
                type: "text",
                id: "contract1endTime",
                name: "contract_1[end_time]",
                defaultValue: "20230925 15:00:00 UTC",
            },
            {
                label: "Duration:",
                type: "select",
                id: "contract1Duration",
                name: "contract_1[duration]",
                options: ["1 D", "2 D", "5 D", "10 D", "29 D"],
                defaultValue: "5 D",
            },
            {
                label: "Bar Size:",
                type: "select",
                id: "contract1BarSize",
                name: "contract_1[bar_size]",
                options: ["5 secs", "15 secs", "30 secs", "1 min", "5 mins", "15 mins", "30 mins"],
                defaultValue: "5 mins",
            },
            {
                label: "Show:",
                type: "text",
                id: "contract1Show",
                name: "contract_1[show]",
                defaultValue: "TRADES",
            },
            {
                label: "Contract 2 Symbol:",
                type: "text",
                id: "contract2Symbol",
                name: "contract_2[symbol]",
                defaultValue: "COIL",
            },
            {
                label: "Contract 2 Security Type:",
                type: "select",
                id: "contract2SecurityType",
                name: "contract_2[security_type]",
                options: ["FUT", "STK"],
                defaultValue: "FUT",
            },
            {
                label: "Volume Check:",
                type: "text",
                id: "arbitrageFormVolumeCheck",
                name: "volume_check",
                defaultValue: 50,
            },
            {
                label: "Percentile:",
                type: "text",
                id: "percentile",
                name: "percentile",
                defaultValue: 0.02,
            },
            {
                label: "Percentile Sell:",
                type: "text",
                id: "percentileSell",
                name: "percentile_sell",
                defaultValue: 0.05,
            },
            {
                label: "Historical Average Ticks:",
                type: "text",
                id: "arbitrageFormHistoricalAverageTicks",
                name: "historical_average_ticks",
                defaultValue: 50,
            },
        ]
    }
];
const Momentum = [
    {
        sectionTitle: "Momentum Information",
        fields: [
            {
                label: "Symbol",
                type: "text",
                id: "symbol",
                name: "symbol",
                defaultValue: "CL",
            },
            {
                label: "Security Type",
                type: "select",
                id: "securityType",
                name: "security_type",
                options: ["FUT", "STK"],
                defaultValue: "FUT",
            },
            {
                label: "Exchange",
                type: "text",
                id: "exchange",
                name: "exchange",
                defaultValue: "NYMEX",
            },
            {
                label: "Currency",
                type: "text",
                id: "currency",
                name: "currency",
                defaultValue: "USD",
            },
            {
                label: "Last Trade Date",
                type: "text",
                id: "lastTradeDate",
                name: "last_trade_date",
                defaultValue: 20231020, // Assuming you want it as a number
            },
            {
                label: "End Time",
                type: "text",
                id: "endTime",
                name: "end_time",
                defaultValue: "20230925 15:00:00 UTC",
            },
            {
                label: "Duration",
                type: "select",
                id: "duration",
                name: "duration",
                options: ["1 D", "2 D", "5 D", "10 D", "29 D"],
                defaultValue: "1 D",
            },
            {
                label: "Bar Size",
                type: "select",
                id: "barSize",
                name: "bar_size",
                options: ["5 secs", "15 secs", "30 secs", "1 min", "5 mins", "15 mins", "30 mins"],
                defaultValue: "5 secs",
            },
            {
                label: "Show",
                type: "text",
                id: "show",
                name: "show",
                defaultValue: "TRADES",
            },
            {
                label: "History Average Volume Check",
                type: "text",
                id: "history_average",
                name: "history_average",
                defaultValue: 150, // Assuming you want it as a number
            },
            {
                label: "Risk Reward",
                type: "text",
                id: "riskReward",
                name: "risk_reward",
                defaultValue: 1.5, // Assuming you want it as a number
            },
            {
                label: "Opp Trend Check",
                type: "text",
                id: "oppTrendCheck",
                name: "opp_trend_check",
                defaultValue: 3, // Assuming you want it as a number
            },
            {
                label: "Volume Check",
                type: "text",
                id: "volumeCheck",
                name: "volume_check",
                defaultValue: 50, // Assuming you want it as a number
            },
            {
                label: "Historical Average Ticks",
                type: "text",
                id: "historicalAverageTicks",
                name: "historical_average_ticks",
                defaultValue: 50, // Assuming you want it as a number
            }
        ]
    }
];

export {
    Equity,
    Metal,
    Reversal,
    Arbitrage,
    Momentum,
    FactorBalancing
};