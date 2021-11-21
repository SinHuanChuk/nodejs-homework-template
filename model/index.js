const fs = require('fs').promises
const path = require('path')
const contactsPath = path.resolve(__dirname, './contacts.json')

const Contacts = async () => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)
  return contacts
}

const getContactById = async (contactId) => {
  const id = Number(contactId)
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const targetContact = contacts.find((contact) => contact.id === id)

  return targetContact
}

const removeContact = async (contactId) => {
  const id = Number(contactId)
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const targetContact = contacts.find((contact) => contact.id === id)

  contacts.splice(targetContact.id - 1, 1)

  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return targetContact
}

const addContact = async (body) => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    ...body
  }

  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return newContact
}

const updateContacts = async (contactId, body) => {
  const id = Number(contactId)
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  let targetContact = contacts.find((contact) => contact.id === id)
  contacts = contacts.map((contact) => contact.id === id ? { ...contact, ...body } : contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  targetContact = contacts.find((contact) => contact.id === id)

  return targetContact
}

module.exports = {
  Contacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
}
