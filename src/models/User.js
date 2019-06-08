let records = [
  {
    id: "1",
    name: "Alice",
    email: "user@example.com"
  },
  {
    id: "2",
    name: "Bob",
    email: "user@example.com"
  }
];
let serial = 2;

function match(a, b) {
  return Object.keys(b).reduce((c, d) => c && a[d] === b[d], true);
}

export function all() {
  return [...records];
}

export function search(criteria = {}) {
  return records.filter(record => match(record, criteria));
}

export function find(id) {
  return records.reduce((c, record) => (record.id === id ? record : c), null);
}

export function create({ name, email }) {
  const id = String(++serial);
  const record = { id, name, email };
  records.push(record);
  return find(id);
}

export function update(id, { name, email }) {
  records = records.map(record =>
    id === record.id ? { ...record, name, email } : record
  );
  return find(id);
}

export function remove(id) {
  records = records.filter(record => id !== record.id);
}
