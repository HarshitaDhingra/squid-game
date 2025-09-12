const conferenceRooms = ["a", "b", "c"];
const bookedMeetings = {};

function scheduleMeetings(startTime, endTime) {
  for (const room of conferenceRooms) {
    if (!bookedMeetings[room]) {
      bookedMeetings[room] = [{ startTime, endTime }];
      return room; // Return the booked room
    } else {
      let isRoomAvailable = true;
      for (const bookedSlot of bookedMeetings[room]) {
        const { startTime: bookedStartTime, endTime: bookedEndTime } =
          bookedSlot;
        if (startTime < bookedEndTime && endTime > bookedStartTime) {
          // If there's an overlap, mark the room as unavailable
          isRoomAvailable = false;
          break;
        }
      }

      if (isRoomAvailable) {
        // If no overlap found, add the new meeting slot to the booked meetings
        bookedMeetings[room].push({ startTime, endTime });
        return room; // Return the booked room
      }
    }
  }

  return "Error: No available rooms for this time slot"; // Return error if no rooms are available
}

// Example usage:
console.log(scheduleMeetings(9, 10)); // Booked room: "a"
console.log(scheduleMeetings(11, 12)); // Booked room: "a"
// console.log(scheduleMeetings(10, 11)); // Booked room: "a"
// console.log(scheduleMeetings(9, 10)); // Booked room: "b"
// console.log(scheduleMeetings(9, 10)); // Booked room: "c"
// console.log(scheduleMeetings(9, 10)); // Error

bookedMeetings;
