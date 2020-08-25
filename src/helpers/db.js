import { db } from "../services/firebase";

export function readchats() {
  let abc = [];
  db.ref("chats").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      abc.push(snap.val());
    });
    return abc;
  });
}

export function writechats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}

export function readanime() {
  let abc = [];
  db.ref("anime").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      abc.push(snap.val());
    });
    return abc;
  });
}

export function writeanime(message) {
  return db.ref("anime").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}

export function readmovies() {
  let abc = [];
  db.ref("movies").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      abc.push(snap.val());
    });
    return abc;
  });
}

export function writemovies(message) {
  return db.ref("movies").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}
