import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    InputLabel,
    FormControl,
    Box,
    Paper,
} from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function Currency() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState("");

    let token = "fca_live_FXhn90pUyFbfVTdrOWM2D7FM3b9wcfnXrzIYN0tO";
    let baseUrl = "https://api.freecurrencyapi.com/v1/latest";

    const exchange = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}?apikey=${token}&base_currency=${fromCurrency}`
            );
            const result = (response.data.data[toCurrency] * amount).toFixed(2);
            setResult(result);
        } catch (error) {
            console.error("An error occurred: ", error);
            setResult("An error occurred");
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const currencies = [
        { code: "USD", symbol: "$" },
        { code: "EUR", symbol: "€" },
        { code: "TRY", symbol: "₺" },
        { code: "GBP", symbol: "£" },
        { code: "JPY", symbol: "¥" },
        { code: "AUD", symbol: "A$" },
        { code: "CAD", symbol: "C$" },
        { code: "CHF", symbol: "CHF" },
        { code: "CNY", symbol: "¥" },
        { code: "SEK", symbol: "kr" },
        { code: "NZD", symbol: "NZ$" },
    ];

    return (
        <Container
            maxWidth='lg'
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: { xs: 2, sm: 4, md: 6 },
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: { xs: 2, sm: 4, md: 6 },
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    }}
                >
                    Currency Exchange Application
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 2,
                        width: "100%",
                    }}
                >
                    <TextField
                        label='Amount'
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        variant='outlined'
                        size='medium'
                        sx={{
                            width: { xs: "100%", sm: "132px" },
                        }}
                    />
                    <FormControl
                        size='medium'
                        sx={{
                            width: { xs: "100%", sm: "132px" },
                        }}
                    >
                        <InputLabel>From</InputLabel>
                        <Select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            label='From Currency'
                        >
                            {currencies.map((currency) => (
                                <MenuItem
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} - {currency.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100%", sm: "auto" }, // Mobilde tam genişlik
                            transform: {
                                xs: "rotate(90deg)",
                                sm: "rotate(0deg)",
                            }, // Küçük ekranlarda ok simgesini döndürme
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <FaArrowRight
                            style={{
                                cursor: "pointer",
                                fontSize: "24px",
                                margin: { xs: "16px 0", sm: "0" },
                            }}
                            onClick={swapCurrencies}
                        />
                    </Box>
                    <FormControl
                        size='medium'
                        sx={{
                            width: { xs: "100%", sm: "132px" },
                        }}
                    >
                        <InputLabel>To</InputLabel>
                        <Select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            label='To Currency'
                        >
                            {currencies.map((currency) => (
                                <MenuItem
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} - {currency.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label='Result'
                        value={result}
                        variant='outlined'
                        size='medium'
                        InputProps={{ readOnly: true }}
                        sx={{
                            width: { xs: "100%", sm: "132px" },
                        }}
                    />
                </Box>

                <Button
                    variant='contained'
                    color='success'
                    onClick={exchange}
                    sx={{
                        marginTop: 2,
                        width: { xs: "100%", sm: "auto" },
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                        },
                        "&:active": {
                            transform: "scale(0.98)",
                        },
                    }}
                >
                    Convert
                </Button>
                <hr />
                <Typography
                    variant='h5'
                    gutterBottom
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                    }}
                >
                    ERNTRGT
                </Typography>
            </Paper>
        </Container>
    );
}

export default Currency;
