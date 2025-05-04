document.addEventListener('DOMContentLoaded', () => {
  const roleOptions = document.querySelectorAll('.role-option');
  const selectedRoleInput = document.getElementById('selectedRole');

  function clearActiveRoles() {
    roleOptions.forEach(role => role.classList.remove('active'));
  }

  function setRoleUI(role) {
    selectedRoleInput.value = role;
  }
  roleOptions.forEach(option => {
    option.addEventListener('click', () => {
      clearActiveRoles();
      option.classList.add('active');
      setRoleUI(option.dataset.role);
    });
  });
});
