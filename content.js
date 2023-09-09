let bannedUsers = [];
const fileUrl = chrome.runtime.getURL('deleteuser.txt');
console.log(fileUrl)
fetch(fileUrl)
  .then(response => response.text())
  .then(data => {
    bannedUsers = data.split('\n');
    bannedUsers = bannedUsers.filter(userName => userName.trim() !== '');
  })
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    filterMessages();
  });
});
const targetNode = document;
const config = { childList: true, subtree: true };
observer.observe(targetNode, config);

function filterMessages() {
  const buttons = document.querySelectorAll('[data-qa="message_content"] button');

  buttons.forEach(function (button) {
    const messageSender = button.getAttribute('data-message-sender');
    if (bannedUsers.includes(messageSender)) {
      console.log("検知");
      const parent = button.closest('.c-virtual_list__item');
      if (parent) {
        parent.style.display = 'none';
      }
    }
  });
}