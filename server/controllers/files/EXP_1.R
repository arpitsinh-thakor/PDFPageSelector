# Example dataset
data <- c(23, 45, 67, 12, 89, 45, 23, 67, 34, 56)
# Calculate the mean
mean_value <- mean(data)
# Calculate the median
median_value <- median(data)
# Calculate the mode (using a custom function)
mode_value <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
  }
mode_result <- mode_value(data)

# Create a histogram for data distribution
hist(data, main = "Histogram of Data", xlab = "Values", col = "lightblue", border = "black")
# Add a vertical line for the mean
abline(v = mean_value, col = "red", lwd = 2)
# Add a vertical line for the median
abline(v = median_value, col = "blue", lwd = 2)
# Add a vertical line for the mode
abline(v = mode_result, col = "green", lwd = 2)
# Add a legend
legend("topright", legend = c("Mean", "Median", "Mode"), 
       col = c("red", "blue", "green"), lwd = 2)

