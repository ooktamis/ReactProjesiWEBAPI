using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select EmployeeID, EmployeeName, 
                            Department, MailID, convert(varchar(10), DOJ, 120) as 
                            DOJ from dbo.Employees";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }


            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string doj = Convert.ToDateTime(emp.DOJ.Value).ToString("yyyy-MM-dd");
                //string doj = emp.DOJ.ToString().Split(' ')[0];
                string query = @"
                    insert into dbo.Employees
                    (EmployeeName,Department,MailID,DOJ
                     ) 
                    values(
                    '" + emp.EmployeeName + @"',
                    '" + emp.Department + @"',
                    '" + emp.MailID + @"',
                    '" + doj + @"'
                    )";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Basarili";
            }
            catch (Exception)
            {
                return "Basarisiz";
            }
        }

        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string doj = Convert.ToDateTime(emp.DOJ.Value).ToString("yyyy-MM-dd");
                string query = @"
                                update dbo.Employees set 
                                EmployeeName = '" + emp.EmployeeName + @"'
                                ,Department = '" + emp.Department + @"'
                                ,MailID = '" + emp.MailID + @"'
                                ,DOJ = '" + doj + @"'
                                where EmployeeID = " + emp.EmployeeID + @"
                                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Güncelleme Basarili";
            }
            catch (Exception)
            {
                return "Güncelleme Basarisiz";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"delete from dbo.Employees where EmployeeID = " + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "silme Basarili";
            }
            catch (Exception)
            {
                return "Silme Basarisiz";
            }
        }
    }
}
