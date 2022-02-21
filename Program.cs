using EasyFlow;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Runtime;

string root = Directory.GetCurrentDirectory();
var envPath = Path.Combine(root, ".env.aws");
DotEnv.Load(envPath);

string? ACCESS_KEY = Environment.GetEnvironmentVariable("ACCESS_KEY");
string? PRIVATE_KEY = Environment.GetEnvironmentVariable("PRIVATE_KEY");

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

var credentials = new BasicAWSCredentials(ACCESS_KEY, PRIVATE_KEY);
var config = new AmazonDynamoDBConfig()
{
    RegionEndpoint = RegionEndpoint.USEast1
};

var client = new AmazonDynamoDBClient(credentials, config);
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IAmazonDynamoDB>(client);
builder.Services.AddSingleton<IDynamoDBContext, DynamoDBContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html");;

app.Run();
