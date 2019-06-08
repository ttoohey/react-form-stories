let records = [];
let serial = 0;

export function all() {
  return [ ...records ];
}

export function find(id) {
  return records.reduce((c, record) => (record.id === id ? record : c), null);
}

export function create({ title, complete }) {
  const id = String(++serial);
  const record = { id, title, complete };
  records.push(record);
  return find(id);
}

export function update(id, { title, complete }) {
  records = records.map(record =>
    id === record.id ? { ...record, title, complete } : record
  );
  return find(id);
}

export function remove(id) {
  records = records.filter(record => id !== record.id)
}
