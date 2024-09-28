function optimizeBookings(bookings) {
  if (!bookings || bookings.length === 0) {
    return [];
  }
  bookings.sort(function (a, b) {
    return a[0] - b[0];
  });

  var mergedBookings = [];
  var currentBooking = bookings[0];

  for (var i = 1; i < bookings.length; i++) {
    var nextBooking = bookings[i];
    if (currentBooking[1] >= nextBooking[0]) {
      currentBooking = [
        currentBooking[0],
        Math.max(currentBooking[1], nextBooking[1]),
      ];
    } else {
      mergedBookings.push(currentBooking);
      currentBooking = nextBooking;
    }
  }
  mergedBookings.push(currentBooking);
  return mergedBookings;
}
// Test Cases
// 1. Overlapping bookings
var testBookings1 = [
  [9, 12],
  [11, 13],
  [14, 17],
  [16, 18],
];
console.log(
  "Test Case 1 - Overlapping Bookings:",
  optimizeBookings(testBookings1)
);
// 2. Non-overlapping bookings
var testBookings2 = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(
  "Test Case 2 - Non-overlapping Bookings:",
  optimizeBookings(testBookings2)
);
// 3. Consecutive bookings that touch each other
var testBookings3 = [
  [1, 2],
  [2, 3],
  [3, 4],
];
console.log(
  "Test Case 3 - Consecutive Bookings:",
  optimizeBookings(testBookings3)
);
// 4. Bookings that are already merged
var testBookings4 = [
  [1, 5],
  [6, 10],
];
console.log(
  "Test Case 4 - Already Merged Bookings:",
  optimizeBookings(testBookings4)
);
// 5. Empty list of bookings
var testBookings5 = [];
console.log("Test Case 5 - Empty Bookings:", optimizeBookings(testBookings5));
// 6. Random large bookings (up to 1000) to simulate a busy office environment
var largeBookings = [];
for (var i = 0; i < 1000; i++) {
  var start = Math.floor(Math.random() * 1000);
  var end = start + Math.floor(Math.random() * 50); // Random duration
  largeBookings.push([start, end]);
}
console.time("Performance Test - Large Bookings");
var optimizedLargeBookings = optimizeBookings(largeBookings);
console.timeEnd("Performance Test - Large Bookings");
console.log("Number of Merged Bookings:", optimizedLargeBookings.length);
// 7. Test with consecutive bookings that form a single block
var testBookings6 = [
  [1, 3],
  [3, 5],
  [5, 7],
  [7, 9],
];
console.log(
  "Test Case 6 - Forming a Single Block:",
  optimizeBookings(testBookings6)
);
// 8. Overlapping and non-overlapping combined
var testBookings7 = [
  [1, 3],
  [2, 4],
  [5, 8],
  [9, 11],
  [10, 12],
];
console.log(
  "Test Case 7 - Mixed Overlapping:",
  optimizeBookings(testBookings7)
);
