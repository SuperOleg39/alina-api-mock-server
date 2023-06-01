const db = {
  contacts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  contactsById: {
    0: {
      id: 0,
      name: "Princess",
      surname: "Tiabeanie",
      lastMessage: "Gav gav gav",
      avatarImg: "bean",
    },
    1: {
      id: 1,
      name: "Oleg",
      surname: "Drapeza",
      lastMessage: "Bean, good girl!",
      avatarImg: "lovely_boy",
    },
    2: {
      id: 2,
      name: "Alina",
      surname: "Blokhina",
      lastMessage:
        "I think game development is the best coding job. You have to use your imagination and realize what you have in mind. You create an entire world with characters and objects, thinking about in-game mechanics. Oh, it’s a whole art form.",
      avatarImg: "avatar2",
    },
    3: {
      id: 3,
      name: "1ne",
      surname: "here",
      lastMessage: "Two",
      avatarImg: "avatar2",
    },
    4: {
      id: 4,
      name: "Cornfield",
      surname: "Chase",
      lastMessage: "Three",
      avatarImg: "avatar2",
    },
    5: {
      id: 5,
      name: "Day",
      surname: "one",
      lastMessage: "Four",
      avatarImg: "avatar2",
    },
    6: {
      id: 6,
      name: "22",
      surname: "April",
      lastMessage: "Five",
      avatarImg: "avatar2",
    },
    7: {
      id: 7,
      name: "afraid of",
      surname: "Time",
      lastMessage: "Six",
      avatarImg: "avatar2",
    },
    8: {
      id: 8,
      name: "TodayIsFriday",
      surname: "MaybeItsJustLongName",
      lastMessage: "Seven",
      avatarImg: "avatar2",
    },
    9: {
      id: 9,
      name: "Алина",
      surname: "Blokhina",
      lastMessage: "Eight",
      avatarImg: "avatar2",
    },
    10: {
      id: 10,
      name: "Username",
      surname: "here",
      lastMessage: "Nine",
      avatarImg: "avatar2",
    },
    11: {
      id: 11,
      name: "Алина",
      surname: "Блохина",
      lastMessage: "Ten",
      avatarImg: "avatar2",
    },
    12: {
      id: 12,
      name: "Олег",
      surname: "Драпеза",
      lastMessage: "Eleven",
      avatarImg: "avatar2",
    },
    13: {
      id: 13,
      name: "Иван",
      surname: "Блохин",
      lastMessage: "Twelve",
      avatarImg: "avatar2",
    },
  },
  messagesByContact: {
    0: [0, 1, 2, 3, 4],
  },
  messagesById: {
    0: {
      id: 0,
      text: "",
      author: 999999,
      date: "March 12",
      attachment: {
        type: "image",
        value: "mamis_dumplongs",
      },
    },
    1: {
      id: 1,
      text: "Who knows? Is this the start of something wonderful and new? Or one more dream that I cannot make true? Gav gav gav Gav Gav gav Gav gav gav",
      author: 999999,
      date: "March 12",
    },
    2: {
      id: 2,
      text: "Who knows? All that is really worth the doing is what we do for others. Everybody has won, and all must have prizes. If you don't think, you shouldn't talk. Gav Gav gav Gav gav gav Who in the world am I? Ah, that's the great puzzle.",
      author: 0,
      date: "March 23",
    },
    3: {
      id: 3,
      text: "I will follow you into the darkness",
      author: 999999,
      date: "April 4",
    },
    4: {
      id: 4,
      text: "My lover's got humour",
      author: 0,
      date: "April 5",
    },
  },
};

export class Repository {
  async getContacts() {
    return db.contacts.map((id) => db.contactsById[id]);
  }

  async getContact(id) {
    return db.contactsById[id];
  }

  async getMessages(contactId) {
    return (
      db.messagesByContact[contactId]?.map((id) => {
        return db.messagesById[String(id)];
      }) ?? []
    );
  }

  async sendMessage(contactId, body) {
    const messagesByContact = db.messagesByContact[contactId];
    const messages = Object.keys(db.messagesById);
    const last = messages.length >= 1 ? messages.length : 0;
    const message = { ...body, author: 999999, id: last };

    if (messagesByContact) {
      db.messagesByContact[contactId].push(message.id);
    } else {
      db.messagesByContact[contactId] = [message.id];
    }

    db.messagesById[message.id] = message;

    return message;
  }
}
