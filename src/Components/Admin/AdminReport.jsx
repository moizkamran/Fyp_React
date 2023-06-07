import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../Firebase/Firebase";

const AdminReport = () => {
    const [reportData, setReportData] = useState(null);
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const reportsRef = ref(database, "Admin/reports");
        onValue(reportsRef, (snapshot) => {
            const reportsData = snapshot.val();
            if (reportsData) {
                const reportsList = Object.keys(reportsData).map((key) => ({
                    id: key,
                    ...reportsData[key],
                }));
                setReports(reportsList);
            }
        });
    }, []);

    const generateReport = () => {
        // Retrieve the selected report type, start date, and end date from the form inputs
        const reportType = document.getElementById("report_type").value;
        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("end_date").value;

        // Generate or fetch the report data based on the selected report type, start date, and end date
        const generatedReport = {
            reportType: reportType,
            startDate: startDate,
            endDate: endDate,
        };

        // Save the report data to Firebase Realtime Database
        const reportsRef = ref(database, "Admin/reports");
        push(reportsRef, generatedReport);

        // Update the state with the generated report data
        setReportData(generatedReport);
    };

    const deleteReport = (id) => {
        const reportToDelete = ref(database, `Admin/reports/${id}`);
        remove(reportToDelete);
    };
    const downloadReport = (id) => {
        const reportRow = document.getElementById(`report_${id}`);
        if (reportRow) {
            const deleteButton = reportRow.querySelector("button:last-child");
            deleteButton.style.display = "none"; // Hide the delete button

            const reportType = reportRow.querySelector("td:nth-child(1)").textContent;
            const startDate = reportRow.querySelector("td:nth-child(2)").textContent;
            const endDate = reportRow.querySelector("td:nth-child(3)").textContent;

            const pdf = new jsPDF();
            pdf.setFontSize(12);
            pdf.text(`Report Type: ${reportType}`, 10, 10);
            pdf.text(`Start Date: ${startDate}`, 10, 20);
            pdf.text(`End Date: ${endDate}`, 10, 30);
            pdf.save(`report_${id}.pdf`);

            deleteButton.style.display = "block"; // Restore the delete button display
        }
    };


    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg px-5">
                    <div className="container-fluid d-flex justify-content-center">
                        <a className="navbar-brand text-white" href="#">
                            Career Pathing
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin_user.html">
                                        User Management
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin.performance.html">
                                        Performance Management
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin_careerpath.html">
                                        Career Pathing
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin_report.html">
                                        Reports
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="General/main.html">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="user ms-auto">
                            <p>
                                Welcome, <span className="username">Admin</span>
                            </p>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    <h1>Report</h1>
                    <p>Here's the report for the month of March:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Report Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((report) => (
                                <tr key={report.id} id={`report_${report.id}`}>
                                    <td>{report.reportType}</td>
                                    <td>{report.startDate}</td>
                                    <td>{report.endDate}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-primary" onClick={() => downloadReport(report.id)} >
                                                Download
                                            </button>
                                            <button style={{ marginLeft: "10px" }} className="btn btn-primary" onClick={() => deleteReport(report.id)} >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {/* Pagination */}
                    <div>
                        {reports.length > itemsPerPage && (
                            <ul className="pagination">
                                {Array(Math.ceil(reports.length / itemsPerPage))
                                    .fill()
                                    .map((_, index) => (
                                        <li key={index + 1} className="page-item">
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <h2>Custom Reports</h2>
                    <form>
                        <label htmlFor="report_type">Report Type:</label>
                        <select id="report_type" name="report_type" required>
                            <option value="performance">Performance Report</option>
                            <option value="training">Training Report</option>
                            <option value="attendance">Attendance Report</option>
                        </select>
                        <br />
                        <label htmlFor="start_date">Start Date:</label>
                        <input type="date" id="start_date" name="start_date" required />
                        <br />
                        <label htmlFor="end_date">End Date:</label>
                        <input type="date" id="end_date" name="end_date" required />
                        <br />
                        <button className="btn btn-primary" type="button" onClick={generateReport}>
                            Generate Report
                        </button>
                    </form>

                    <hr />
                    <h2>Reports History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Report Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData ? (
                                <tr>
                                    <td>{reportData.reportType}</td>
                                    <td>{reportData.startDate}</td>
                                    <td>{reportData.endDate}</td>
                                    <td>
                                        <button className="btn btn-primary" >View</button>
                                    </td>
                                </tr>
                            ) : null}

                        </tbody>
                    </table>
                </div>
            </main>
            <footer>
                <p>&copy; All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminReport;
