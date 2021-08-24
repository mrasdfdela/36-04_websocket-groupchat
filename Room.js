/** Chat rooms that can be joined/left/broadcast to. */

// in-memory storage of roomNames -> room

const ROOMS = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** get room by that name, creating if nonexistent
   *
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the ROOMS variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   **/

  static get(roomName) {
    if (!ROOMS.has(roomName)) {
      ROOMS.set(roomName, new Room(roomName));
    }

    return ROOMS.get(roomName);
  }

  /** make a new room, starting with empty set of listeners */

  constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
  }

  /** member joining a room. */

  join(member) {
    this.members.add(member);
  }

  /** member leaving a room. */

  leave(member) {
    this.members.delete(member);
  }

  /** send message to all members in a room. */

  broadcast(data) {
    for (let member of this.members) {
      // console.log(`broadcast member: ${member}`);
      // console.log(JSON.stringify(data));
      member.send(JSON.stringify(data));
    }
  }

  /** send alert to member of room **/
  member_alert(member, data){
    // console.log(`alert member: ${member}`);
    // console.log(JSON.stringify(data));
    member.send(JSON.stringify(data));
  }

  /** send alert to member of room **/
  member_list(member){
    let memberList = [];
    for (let m of this.members){
      memberList.push(m.name);
    }
    member.send(JSON.stringify({"name":"private", "type": "chat", "text":memberList}));
  }

  /** send private message **/
  private_msg(member,data){
    const confirmation = {
      "name":`${member.name} to ${data.name}`,
      "type":"chat",
      "text":data.text
    }
    member.send(JSON.stringify(confirmation));
    
    let send_to
    for (let m of this.members){
      console.log(`${m.name} and ${data.name}`);
      if (m.name == data.name){
        send_to = m;
        data.name = `${member.name} to ${data.name}`
      }
    }
    send_to.send(JSON.stringify(data));
  }
}

module.exports = Room;
