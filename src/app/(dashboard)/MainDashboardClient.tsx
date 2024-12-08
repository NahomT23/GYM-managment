"use client";

const MainDashboardClient = ({ members }: { members: any[] }) => {
  return (
    <div>
      <h2>Members List</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainDashboardClient;
