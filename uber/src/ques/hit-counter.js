//  It should support the following two operations: hit and getHits. hit(timestamp) – 
//  Shows a hit at the given timestamp. getHits(timestamp) – Returns the number of hits received in past 5 mins (300 seconds)
//  (from currentTimestamp). Each function accepts a timestamp parameter (in seconds granularity) and you may assume that 
//  calls are being made to the system in chronological order (i.e. the timestamp is monotonically increasing). 
//  You may assume that the earliest timestamp starts at 1. Examples:
// https://www.youtube.com/watch?v=MKihMUdG3O8

class HitCounter {
  constructor() {
    this.hits = [];
  }

  hit(timestamp) {
    this.hits.push(timestamp);
  }

  getHits(timestamp) {
    let left = 0;
    let right = this.hits.length - 1;
    const target = timestamp - 300;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.hits[mid] <= target) left = mid + 1;
      else right = mid - 1;
    }

    return this.hits.length - left;
  }
}

// ✅ Correct object creation
const counter = new HitCounter();

// hit at timestamp 1
counter.hit(1);

// hit at timestamp 2
counter.hit(2);

// hit at timestamp 3
counter.hit(3);

// get hits at timestamp 4 → should return 3
console.log(counter.getHits(4));

// hit at timestamp 300
counter.hit(300);

// get hits at timestamp 300 → should return 4
console.log(counter.getHits(300));

// get hits at timestamp 301 → should return 3
console.log(counter.getHits(301));

// cpp
// class HitCounter {
// public:
//     vector<int> hits;

//     HitCounter() {}

//     void hit(int timestamp) {
//         hits.push_back(timestamp);
//     }

//     int getHits(int timestamp) {
//         int left = 0, right = hits.size() - 1;
//         int target = timestamp - 300;

//         // Binary search to find first hit > target
//         while (left <= right) {
//             int mid = left + (right - left) / 2;
//             if (hits[mid] <= target)
//                 left = mid + 1;
//             else
//                 right = mid - 1;
//         }

//         return hits.size() - left;
//     }
// };
// using queueu
let q = [];

/** Record a hit.
    @param timestamp - The current timestamp
                (in seconds granularity). */
function hit(timestamp)
{
    q.push(timestamp);
}

// Time Complexity : O(1)

/** Return the number of hits in the past 5 minutes.
@param timestamp - The current timestamp (in seconds
granularity). */
function getHits(timestamp)
{
    while (q.length > 0 && timestamp - q[0] >= 300) {
        q.shift();
    }
    return q.length;
}
// Time Complexity : O(n)

// This code is contributed by akashish__