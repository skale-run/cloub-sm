export type Profile = {
  fullName: string;
  role: string;
  squad: string;
  email: string;
  emergencyContact: string;
  membershipId: string;
};

export const emptyProfile: Profile = {
  fullName: "",
  role: "",
  squad: "",
  email: "",
  emergencyContact: "",
  membershipId: "",
};
