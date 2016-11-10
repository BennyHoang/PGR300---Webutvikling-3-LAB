using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;

namespace TrumpApp.Controllers
{
    public class TrumpController : ApiController
    {
        public HttpRequestMessage AddFact()
        {
            
        }
        public HttpResponseMessage GetFacts()
        {
            XElement factsXML = XElement.Load(GetFilePath());

            var factList = from facts in factsXML.Descendants("funFact")
                           select facts;

            return Request.CreateResponse(HttpStatusCode.OK, factList);
        }

        public String GetFilePath()
        {
            return System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/trumpFunFacts.xml");
        }
    }
}
