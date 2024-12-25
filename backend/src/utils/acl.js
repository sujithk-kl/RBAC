module.exports = {
    CEO: {
      permissions: [
        "add_user", 
        "delete_user", 
        "update_user", 
        "view_logs", 
        "assign_roles"
      ],
    },
    Manager: {
      permissions: [
        "generate_reports", 
        "approve_tasks", 
        "manage_team"
      ],
    },
    TeamLeader: {
      permissions: [
        "assign_tasks", 
        "track_progress"
      ],
    },
    TeamMember: {
      permissions: [
        "submit_reports", 
        "update_task_status"
      ],
    },
  };
  