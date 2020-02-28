const fs = require("fs");
const soap = require("strong-soap").soap;
const { assignArrayToDeepObject } = require("./util");
const XMLHandler = soap.XMLHandler;
const xmlHandler = new XMLHandler();

try {
  const body = JSON.parse(
    fs.readFileSync("./src/template.json", { encoding: "utf8" })
  );
  const datas = JSON.parse(
    fs.readFileSync("./src/datas.json", { encoding: "utf8" })
  );

  const payload = assignArrayToDeepObject(datas, body);

  console.log(JSON.stringify(payload.demandeCreerArticles.article));

  const xml = xmlHandler
    .jsonToXml(
      null,
      null,
      XMLHandler.createSOAPEnvelopeDescriptor("soap"),
      payload
    )
    .end({ pretty: true });

  console.log(xml);

  fs.writeFileSync("./payload.xml", xml, { encoding: "utf8" });
} catch (err) {
  console.error(err);
}
