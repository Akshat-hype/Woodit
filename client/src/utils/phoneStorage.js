const KEY = "woodit_user_phone";

export function savePhone(phone) {
  localStorage.setItem(KEY, phone);
}

export function getPhone() {
  return localStorage.getItem(KEY);
}

export function clearPhone() {
  localStorage.removeItem(KEY);
}
