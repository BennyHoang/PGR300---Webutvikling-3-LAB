using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using TrumpApp.Models;

namespace TrumpApp.Controllers
{
    public class TrumpController : ApiController
    {
        public HttpResponseMessage AddFact(FunFact funFact)
        {
            XElement factsXML = XElement.Load(GetFilePath());

            factsXML.Add(
                new XElement("funFact",
                    new XElement("id", funFact.Id),
                    new XElement("fact", funFact.Fact)
                )
            );
            factsXML.Save(GetFilePath());
            return Request.CreateResponse(HttpStatusCode.Created, funFact);
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
