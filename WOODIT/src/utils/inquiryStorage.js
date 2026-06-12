const KEY = "woodit_inquiries";

export function saveInquiry(inquiry) {
  const existing = JSON.parse(localStorage.getItem(KEY)) || [];
  existing.push(inquiry);
  localStorage.setItem(KEY, JSON.stringify(existing));
}

export function getInquiries() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function clearInquiries() {
  localStorage.removeItem(KEY);
}
