using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using JuletradisjonApp.Models;

namespace JuletradisjonApp.Controllers
{

    public class JuletradisjonController : ApiController
    {
        public HttpResponseMessage PostJuletradisjon(Juletradisjon _juletradisjon)
        {
            XElement juletradisjonXML = XElement.Load(GetFilePath());

            juletradisjonXML.Add(
                new XElement("juletradisjon",
                    new XElement("id", _juletradisjon.Id),
                    new XElement("tekst", _juletradisjon.Tekst),
                    new XElement("opprinnelse", _juletradisjon.Opprinnelse)
                )
              );
            juletradisjonXML.Save(GetFilePath());
            return Request.CreateResponse(HttpStatusCode.Created, _juletradisjon);
        }
        public HttpResponseMessage DeleteJuletradisjon(int id)
        {
            XElement juletradisjonXML = XElement.Load(GetFilePath());

            var valgtJuletradisjon = (from juletradisjon in juletradisjonXML.Descendants("juletradisjon")
                                      where (int)juletradisjon.Element("id") == id
                                      select juletradisjon).SingleOrDefault();
            valgtJuletradisjon.Remove();

            juletradisjonXML.Save(GetFilePath());
            return Request.CreateResponse(HttpStatusCode.OK, valgtJuletradisjon);
        }
        public HttpResponseMessage PutJuletradisjon(Juletradisjon _juletradisjon)
        {
            XElement juletradisjonXML = XElement.Load(GetFilePath());
            var valgtJuletradisjon = (from juletradisjon in juletradisjonXML.Descendants("juletradisjon")
                                      where (int)juletradisjon.Element("id") == _juletradisjon.Id
                                      select juletradisjon).SingleOrDefault();
            valgtJuletradisjon.SetElementValue("tekst", _juletradisjon.Tekst);
            valgtJuletradisjon.SetElementValue("opprinnelse", _juletradisjon.Opprinnelse);

            juletradisjonXML.Save(GetFilePath());

            return Request.CreateResponse(HttpStatusCode.OK, valgtJuletradisjon);
        }
        public HttpResponseMessage GetJuletradisjon(int? id)
        {
            //Step 1: connecto to DB
            XElement juletradisjonXML = XElement.Load(GetFilePath());
            //Step 2: LINQ-query
            var valgtJuletradisjon = (from juletradisjon in juletradisjonXML.Descendants("juletradisjon")
                                      where (int)juletradisjon.Element("id") == id
                                      select juletradisjon).SingleOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, valgtJuletradisjon);

        }

        private String GetFilePath()
        {
            return System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/juletradisjoner.xml");
        }
    }
}
