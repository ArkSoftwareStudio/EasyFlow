using Amazon.DynamoDBv2.DataModel;
namespace TestDynamoApi.Controllers;

[DynamoDBTable("Users")]
public class Users
{
    [DynamoDBHashKey]
    public string UserName { get; set; }
    [DynamoDBRangeKey]
    public int UserId { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public DateTime? CreatedAt { get; set; }
}



