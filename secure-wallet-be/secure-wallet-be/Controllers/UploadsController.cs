using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using secure_wallet_be.Entities;
using secure_wallet_be.Helper;
using secure_wallet_be.Models;
using System.Security.Claims;

namespace secure_wallet_be.Controllers
{
    [Route("api/uploads")]
    [ApiController, Authorize]
    public class UploadsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly Messages _messages = new Messages();
        private readonly Cryptography _hash = new Cryptography();
        public readonly Mailer _mailer = new Mailer();
        public UploadsController(ILogger<UploadsController> logger)
        {
            _logger = logger;
        }

        //UPLOAD CLIENT LOGO
        [HttpPost, Route("upload")]
        public async Task<ResponseModel> UploadFile()
        {
            _logger.LogInformation("Enter into UploadFile");
            PutObjectResponse response = new PutObjectResponse();
            S3Model s3Model = new S3Model();
            string localFolderName = string.Empty;
            string foldername = string.Empty;
            string sS3Bucket = string.Empty;
            var config = new ConfigurationBuilder().SetBasePath(System.IO.Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var file = Request.Form.Files[0];

            localFolderName = Path.Combine("Uploads", "Photos");
            sS3Bucket = "AWS";
            foldername = "users";

            var newGuid = Guid.NewGuid().ToString();
            s3Model.S3SecretAccessKey = config[sS3Bucket + ":S3SecretAccessKey"];
            s3Model.S3AccessKey = config[sS3Bucket + ":S3AccessKey"];
            s3Model.Issuer = config[sS3Bucket + ":Issuer"];
            s3Model.S3BucketName = config[sS3Bucket + ":S3BucketName"];
            s3Model.S3LocationPath = config[sS3Bucket + ":S3LocationPath"];
            var pathToSave = Path.Combine(System.IO.Directory.GetCurrentDirectory(), localFolderName);
            var Filename = file.FileName.ToString();
            var FileWithoutExtension = Path.GetFileNameWithoutExtension(Filename);
            var FileExtension = Path.GetExtension(Filename);
            Filename = FileWithoutExtension + "-" + newGuid + FileExtension;
            var fullPath = Path.Combine(pathToSave, Filename);
            _logger.LogInformation("file full path :" + fullPath + " changed file name : " + Filename);
            using (var client = new AmazonS3Client(s3Model.S3AccessKey, s3Model.S3SecretAccessKey, RegionEndpoint.USEast1))
            {
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    try
                    {
                        file.CopyTo(stream);
                        var putRequest1 = new PutObjectRequest
                        {
                            BucketName = s3Model.S3BucketName,
                            Key = foldername + "/" + Filename,
                            InputStream = stream,
                            CannedACL = S3CannedACL.PublicRead
                        };
                        response = await client.PutObjectAsync(putRequest1);
                        _logger.LogInformation(file.FileName + " Uploaded successfully in aws ");
                        using(dbcon _dbcon = new dbcon())
                        {
                            var identity = (ClaimsIdentity)User.Identity;
                            int UserId = Convert.ToInt32(identity.Name);
                            var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x=>x.Id== UserId);
                            if (userDetails != null)
                            {
                                userDetails.Photo = s3Model.S3LocationPath + foldername + "/" + Filename;
                                _dbcon.SaveChanges();
                              
                            }
                            return new ResponseModel { Message = _messages.UPDATED_SUCCESSFULLY, Status = _messages.SUCCESS };
                        }
                       
                    }
                    catch (AmazonS3Exception ex)
                    {
                        return new ResponseModel { Message = ex.Message, Status = _messages.WARNING };
                    }
                }
            }

        }

    }
}
