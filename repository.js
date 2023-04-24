const db = {
  contacts: [],
  contactsById: {
    0: {},
  },
  messagesByContact: {
    0: [0, 1, 2],
  },
};

export class Repository {
  async getContacts() {
    return db.contacts.map((id) => db.contactsById[id]);
  }

  async getContact(id) {
    return db.contactsById[id];
  }

  async getMessages(id) {
    return db.messagesByContact[id];
  }

  async sendMessage(id, body) {
    const messages = db.messagesByContact[id];
    const last = messages[messages.length - 1];
    const message = { ...body, id: last.id + 1 };

    messages.push(message);

    return message;
  }
}
