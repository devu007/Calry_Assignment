function optimizeBookings(bookings: number[][]): number[][] {
    if (!bookings || bookings.length === 0) {
        return [];
    }

    // Step 1: Sort bookings by start time
    bookings.sort((a, b) => a[0] - b[0]);

    // Step 2: Initialize the merged bookings array
    const mergedBookings: number[][] = [];
    let currentBooking = bookings[0];

    // Step 3: Traverse and merge overlapping/consecutive bookings
    for (let i = 1; i < bookings.length; i++) {
        const nextBooking = bookings[i];

        // Check if the current booking overlaps or is consecutive with the next one
        if (currentBooking[1] >= nextBooking[0]) {
            // Merge the current and next booking
            currentBooking = [currentBooking[0], Math.max(currentBooking[1], nextBooking[1])];
        } else {
            // No overlap, push the current booking and update currentBooking
            mergedBookings.push(currentBooking);
            currentBooking = nextBooking;
        }
    }

    // Push the last booking
    mergedBookings.push(currentBooking);

    return mergedBookings;
}

// Test Cases

// 1. Overlapping bookings
const testBookings1 = [[9, 12], [11, 13], [14, 17], [16, 18]];
console.log("Test Case 1 - Overlapping Bookings:", optimizeBookings(testBookings1)); 
// Expected output: [[9, 13], [14, 18]]

// 2. Non-overlapping bookings
const testBookings2 = [[1, 2], [3, 4], [5, 6]];
console.log("Test Case 2 - Non-overlapping Bookings:", optimizeBookings(testBookings2)); 
// Expected output: [[1, 2], [3, 4], [5, 6]]

// 3. Consecutive bookings that touch each other
const testBookings3 = [[1, 2], [2, 3], [3, 4]];
console.log("Test Case 3 - Consecutive Bookings:", optimizeBookings(testBookings3)); 
// Expected output: [[1, 4]]

// 4. Bookings that are already merged
const testBookings4 = [[1, 5], [6, 10]];
console.log("Test Case 4 - Already Merged Bookings:", optimizeBookings(testBookings4)); 
// Expected output: [[1, 5], [6, 10]]

// 5. Empty list of bookings
const testBookings5: number[][] = [];
console.log("Test Case 5 - Empty Bookings:", optimizeBookings(testBookings5)); 
// Expected output: []

// 6. Random large bookings (up to 1000) to simulate a busy office environment
const largeBookings: number[][] = [];
for (let i = 0; i < 1000; i++) {
    const start = Math.floor(Math.random() * 1000);
    const end = start + Math.floor(Math.random() * 50); // Random duration
    largeBookings.push([start, end]);
}
console.time("Performance Test - Large Bookings");
const optimizedLargeBookings = optimizeBookings(largeBookings);
console.timeEnd("Performance Test - Large Bookings");
console.log("Number of Merged Bookings:", optimizedLargeBookings.length);

// 7. Test with consecutive bookings that form a single block
const testBookings6 = [[1, 3], [3, 5], [5, 7], [7, 9]];
console.log("Test Case 6 - Forming a Single Block:", optimizeBookings(testBookings6)); 
// Expected output: [[1, 9]]

// 8. Overlapping and non-overlapping combined
const testBookings7 = [[1, 3], [2, 4], [5, 8], [9, 11], [10, 12]];
console.log("Test Case 7 - Mixed Overlapping:", optimizeBookings(testBookings7)); 
// Expected output: [[1, 4], [5, 8], [9, 12]]
