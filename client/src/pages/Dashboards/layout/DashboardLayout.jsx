import React from 'react'
import { CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {useState } from 'react';
import { MdLogout } from "react-icons/md";
import logoOnDark from "../../../assets/logo/logo-on-dark.svg"
import { IoIosMenu } from "react-icons/io";
import {Link, NavLink, Outlet} from "react-router-dom"
import logo from "../../../assets/logo/logo.svg"
import { FaUndo } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const ASIDEMENUS = {
    patient: {
        heading: "My Health",
        items: [
            {to: "/patient", label: "overview", icon: CiHome},
            {to: "/doctors", label: "Find a doctor", icon: FaSearch},
            {to: "/patient/appointments", label: "My appointment", icon: CiCalendar},
            {to: "/patient/note", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/patient/payments", label: "Payments", icon: MdOutlinePayment},
        ]
    },
    doctor: {
        heading: "Doctor workspace",
        items: [
            {to: "/doctor", label: "overview", icon: CiHome},
            {to: "/doctor/schedule", label: "schedule", icon: CiCalendar},
            {to: "/doctor/profile", label: "Profile & availability", icon: FaRegClock},
            {to: "/doctor/notes", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/doctor/earnings", label: "Earnings", icon: GiMoneyStack},
        ]    
    },
    admin: {
         heading: "Admin",
        items: [
            {to: "/admin", label: "overview", icon: CiHome},
            {to: "/admin/doctors", label: "Doctor approvals", icon: FaStethoscope, notificationBadge: "pendingDoctors"},
            {to: "/admin/users", label: "Users", icon: FiUsers},
            {to: "/admin/appointments", label: "Appointments", icon: CiCalendar},
            {to: "/admin/payments", label: "payments & refunds", icon: FaUndo, notificationBadge: "refundsNeeded"},
            {to: "/admin/revenue", label: "revenue", icon: FaChartLine},
        ]
    }
}

const ROLE_LABEL = {
    patient: "Patient",
    doctor: "Doctor",
    admin: "Administrator"
}


function DashboardLayout({role}) {
    const [open, setOpen] = useState(false);
    const menu = ASIDEMENUS[role];


  return (
    <div className="dash">
        <header className="dash-topbar">
            <Link to={"/"} className="dash-logo">
            <img src={logo} alt="Carebook logo" />
            </Link>
            <button className="dash-menu-btn">
                {open ? <IoClose /> : <IoIosMenu />}
            </button>
        </header>
        <aside id='dash-sidebar' className={`dash-side ${open ? 'open' : ''}`}>
            <Link to={"/"} className='dash-logo'>
              <img src={logoOnDark} alt="Carebook logo" />
            </Link>
            <p className="dash-side-heading">{menu.heading}</p>
            <nav className="dash-nav">
                {
                    menu.items.map((item) => {
                        const MenuIcon = item.icon;
                        return (
                            <NavLink to={item.to} key={item.to}>
                                {MenuIcon && <MenuIcon size={18} />}
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })
                }
            </nav>
            <button className="dash-logout">
                <MdLogout />
                <span className="sr-only">Log out</span>
            </button>

        </aside>
        <main className="dash-main">
            <Outlet />

        </main> 
    </div>
  )
}

export default DashboardLayout
