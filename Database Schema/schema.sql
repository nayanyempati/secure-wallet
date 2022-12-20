USE [master]
GO
/****** Object:  Database [password_wallet]    Script Date: 20-12-2022 11.32.51 PM ******/
CREATE DATABASE [password_wallet]
ALTER DATABASE [password_wallet] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [password_wallet].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [password_wallet] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [password_wallet] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [password_wallet] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [password_wallet] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [password_wallet] SET ARITHABORT OFF 
GO
ALTER DATABASE [password_wallet] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [password_wallet] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [password_wallet] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [password_wallet] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [password_wallet] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [password_wallet] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [password_wallet] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [password_wallet] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [password_wallet] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [password_wallet] SET  DISABLE_BROKER 
GO
ALTER DATABASE [password_wallet] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [password_wallet] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [password_wallet] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [password_wallet] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [password_wallet] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [password_wallet] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [password_wallet] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [password_wallet] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [password_wallet] SET  MULTI_USER 
GO
ALTER DATABASE [password_wallet] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [password_wallet] SET DB_CHAINING OFF 
GO
ALTER DATABASE [password_wallet] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [password_wallet] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [password_wallet] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [password_wallet] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [password_wallet] SET QUERY_STORE = OFF
GO
USE [password_wallet]
GO
/****** Object:  Table [dbo].[card_data]    Script Date: 20-12-2022 11.32.51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[card_data](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[card_number] [varchar](max) NOT NULL,
	[expiry] [varchar](50) NOT NULL,
	[card_name] [varchar](50) NOT NULL,
	[token] [varchar](50) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[user_id] [int] NOT NULL,
	[card_type] [varchar](50) NULL,
 CONSTRAINT [PK_card_data] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[otp]    Script Date: 20-12-2022 11.32.51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[otp](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[otp] [int] NOT NULL,
 CONSTRAINT [PK_otp] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[passwords]    Script Date: 20-12-2022 11.32.51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[passwords](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](500) NOT NULL,
	[url] [varchar](max) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[notes] [varchar](max) NULL,
	[created_on] [datetime] NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [varchar](50) NOT NULL,
 CONSTRAINT [PK_passwords] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 20-12-2022 11.32.51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[is_verified] [int] NOT NULL,
	[photo] [varchar](max) NULL,
	[verified_on] [datetime] NULL,
	[token] [varchar](50) NOT NULL,
	[otp] [varchar](50) NULL,
	[password_reset_otp] [varchar](50) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_is_verified]  DEFAULT ((0)) FOR [is_verified]
GO
USE [master]
GO
ALTER DATABASE [password_wallet] SET  READ_WRITE 
GO
