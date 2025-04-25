# 🛒 Gift Card Knapsack Simulator

## 📌 Project Description

This project simulates the well-known **0/1 Knapsack Problem** in the context of a real-life scenario:

> _You have just won a gift card, but your shopping cart has a limited weight capacity. You must select the most valuable combination of items without exceeding the weight limit._

The objective is to help users make the **best choice of items** by maximizing their total value, while staying within a defined weight constraint. This simulation demonstrates how **dynamic programming** can be used to solve combinatorial optimization problems.

---

## 💡 Features

- User-defined cart weight capacity (in kilograms)
- Customizable list of items (each with a name, weight, and value)
- Optimized solution using the 0/1 Knapsack dynamic programming approach
- Displays:
  - Maximum achievable value
  - Selected items
  - Total weight used

---

## 🧠 Algorithm

The solution is based on **bottom-up dynamic programming**, using a 2D table `dp[i][w]` where:
- `i` is the number of items considered,
- `w` is the remaining capacity.

This allows the algorithm to efficiently compute the best subset of items by avoiding redundant calculations and ensuring optimal substructure.

---

## 🧪 Example Scenario

**Cart Capacity**: `5 kg`

**Available Items**:

| Item       | Weight (kg) | Value (€) |
|------------|-------------|-----------|
| Headphones | 1           | 150       |
| Tablet     | 3           | 500       |
| Book       | 2           | 100       |
| Camera     | 4           | 300       |

**Expected Output**:
- **Maximum Value**: `€650`
- **Selected Items**: Headphones, Tablet
- **Total Weight Used**: `4 kg`

---
