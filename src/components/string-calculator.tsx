import { useState } from "react";
import { TextField, Button, Typography, Container, Tooltip } from "@mui/material";

const parseNumbers = (input: string): number[] => {
  if (!input) return [];

  let delimiter = ",";

  if (input.startsWith("//")) {
    delimiter = input[2];
    input = input.slice(3);
  }

  const numbers = input.replace(/\\n/g, delimiter).split(delimiter).map(Number);

  const negatives = numbers.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return numbers;
};


const add = (numbers: string): number =>
  parseNumbers(numbers).reduce((sum, num) => sum + num, 0);

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string>("");

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        String Calculator
      </Typography>
      <Tooltip
        title="Enter numbers separated by commas or new lines. Use // to specify a custom delimiter."
        arrow
        placement="right"
        followCursor
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Enter numbers..."
          placeholder="e.g. 1,2,3 or //;1;2;3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          margin="normal"
        />
      </Tooltip>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate
      </Button>
      {result !== "" && (
        <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
          Result: {result}
        </Typography>
      )}
    </Container>
  );
};

export default StringCalculator;
