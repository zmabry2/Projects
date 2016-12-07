using System;
using System.Web;
using System.IO;
using System.Web.Script.Services;
using System.Web.Services;
	
[ScriptService]
public partial class Save_Picture : System.Web.UI.Page
{
    [WebMethod()]
    public static void UploadPic (string imageData)
    {
        string Pic_Path = HttpContext.Current.Server.MapPath("MyPicture.png");
        using (FileStream fs = new FileStream(Pic_Path, FileMode.Create))
        {
            using (BinaryWriter bw = new BinaryWriter(fs))
            {
                byte[] data = Convert.FromBase64String(imageData);
                bw.Write(data);
                bw.Close();
            }
        }
    }
}