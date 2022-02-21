using Microsoft.AspNetCore.Mvc;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using System.Text;

namespace TestDynamoApi.Controllers;

[ApiController] 
[Route("[controller]/[action]")]
public class UsersController : Controller
{
    IDynamoDBContext _dynamoDbContext;
    ILogger<UsersController> _logger;

    public UsersController(IDynamoDBContext dynamoDBContext, ILogger<UsersController> logger)
    {
        _dynamoDbContext = dynamoDBContext;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<Users>> GetUsers() {
        ScanFilter filter = new ScanFilter();


        ScanOperationConfig config = new ScanOperationConfig()
        {
            Filter = filter
        };

        return await _dynamoDbContext.FromScanAsync<Users>(config).GetRemainingAsync(); 
    }

    [HttpPost]
    public async Task<ObjectResult> AddUser([FromBody] Users user) {
        user.CreatedAt = DateTime.Now;
        await _dynamoDbContext.SaveAsync(user);
        await _dynamoDbContext.DeleteAsync("ElPepe");
        await _dynamoDbContext.LoadAsync("Arkeologen");
        return Ok(user);
    }

}

