using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace uploadApp.Controllers
{
    public class UploadImageController : ApiController
    {
        public HttpResponseMessage UploadImage()
        {
            if (System.Web.HttpContext.Current.Request.Files != null)
            {
                var file = System.Web.HttpContext.Current.Request.Files[0];
                String fileName = file.FileName;

                file.SaveAs(GetFilePath(fileName));
            }
            return Request.CreateResponse(HttpStatusCode.OK, "OK");
        }

        private String GetFilePath(String fileName)
        {
            return System.Web.Hosting.HostingEnvironment.MapPath(@"~/Images/" + fileName);
        }
    }
}
