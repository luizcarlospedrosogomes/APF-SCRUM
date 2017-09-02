-- --------------------------------------------------------
-- Servidor:                     ec2-54-163-233-201.compute-1.amazonaws.com
-- Versão do servidor:           PostgreSQL 9.6.4 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 4.8.4-2ubuntu1~14.04.3) 4.8.4, 64-bit
-- OS do Servidor:               
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela public.usuario
DROP TABLE IF EXISTS "usuario";
CREATE TABLE IF NOT EXISTS "usuario" (
	"id" INTEGER NOT NULL COMMENT E'',
	"email" CHARACTER VARYING(100) NOT NULL COMMENT E'',
	"senha" CHARACTER VARYING(20) NOT NULL COMMENT E'',
	"tipousuario" CHARACTER VARYING(20) NOT NULL COMMENT E'',
	PRIMARY KEY ("id")
);

-- Copiando dados para a tabela public.usuario: 0 rows
/*!40000 ALTER TABLE "usuario" DISABLE KEYS */;
INSERT INTO "usuario" ("id", "email", "senha", "tipousuario") VALUES
	(1, E'lc.pg@hotmail.com', E'123', E'1'),
	(3, E'master@maste.com', E'123', E'2'),
	(4, E'master@master.com', E'123', E'2');
/*!40000 ALTER TABLE "usuario" ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
