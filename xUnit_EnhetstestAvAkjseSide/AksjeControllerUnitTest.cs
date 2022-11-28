using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using GhostProjectv2.Controllers;
using GhostProjectv2.DAL;
using GhostProjectv2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;


namespace xUnit_EnhetstestAvAkjseSide
{
    public class AksjeControllerUnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<IAksjeRepository> mockRep = new Mock<IAksjeRepository>();
        private readonly Mock<ILogger<AksjeController>> mockLog = new Mock<ILogger<AksjeController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();
    }
}
