import ArchiveIcon from "@mui/icons-material/Archive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";

interface NavLinks {
  href: string;
  label: string;
  activePaths: string[];
  icon: JSX.Element;
}

const links: NavLinks[] = [
  {
    href: "/applications",
    label: "Navbar.applications",
    activePaths: ["/applications/all", "/applications/taken", "/applications"],
    icon: <AssignmentIcon />,
  },
  {
    href: "/my-applications",
    label: "Navbar.myApplications",
    activePaths: ["/my-applications"],
    icon: <AssignmentIndIcon />,
  },
  {
    href: "/clients",
    label: "Navbar.clients",
    activePaths: ["/clients"],
    icon: <PeopleIcon />,
  },
  {
    href: "/tickets",
    label: "Navbar.tickets",
    activePaths: ["/tickets"],
    icon: <MailIcon />,
  },
  {
    href: "/archive",
    label: "Navbar.archive",
    activePaths: ["/archive"],
    icon: <ArchiveIcon />,
  },
  {
    href: "/history",
    label: "Navbar.history",
    activePaths: ["/history"],
    icon: <DateRangeIcon />,
  },
];
export { links };
