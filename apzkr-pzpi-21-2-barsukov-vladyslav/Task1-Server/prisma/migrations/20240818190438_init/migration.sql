-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMINISTRATOR', 'VOLUNTEER', 'VICTIM') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Volunteer` (
    `volunteerId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `surname` VARCHAR(25) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `dateOfBirth` DATE NULL,
    `phoneNumber` VARCHAR(10) NULL,
    `city` VARCHAR(50) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Volunteer_userId_key`(`userId`),
    PRIMARY KEY (`volunteerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerQualification` (
    `volunteerQualificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `volunteerId` INTEGER NOT NULL,
    `qualificationId` INTEGER NOT NULL,

    PRIMARY KEY (`volunteerQualificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerDepartment` (
    `volunteerDepartmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `volunteerId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,

    PRIMARY KEY (`volunteerDepartmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Qualification` (
    `qualificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameOfQualification` VARCHAR(25) NOT NULL,
    `description` VARCHAR(50) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`qualificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrator` (
    `adminId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `surname` VARCHAR(25) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `dateOfBirth` DATE NULL,
    `phoneNumber` VARCHAR(10) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Administrator_userId_key`(`userId`),
    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdministratorDepartment` (
    `adminDepartmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,

    PRIMARY KEY (`adminDepartmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Victim` (
    `victimId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `surname` VARCHAR(25) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `dateOfBirth` DATE NULL,
    `phoneNumber` VARCHAR(10) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Victim_userId_key`(`userId`),
    PRIMARY KEY (`victimId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `departmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameOfDepartment` VARCHAR(25) NOT NULL,
    `description` VARCHAR(50) NULL,
    `phoneNumber` VARCHAR(10) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`departmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DepartmentResource` (
    `departmentResourceId` INTEGER NOT NULL AUTO_INCREMENT,
    `resourceId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,

    PRIMARY KEY (`departmentResourceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resource` (
    `resourceId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameOfResource` VARCHAR(25) NOT NULL,
    `typeOfResourceId` INTEGER NULL,
    `numberOfResources` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`resourceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeOfResource` (
    `typeOfResourceId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameOfType` VARCHAR(25) NOT NULL,
    `description` VARCHAR(50) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`typeOfResourceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statement` (
    `statementId` INTEGER NOT NULL AUTO_INCREMENT,
    `victimId` INTEGER NOT NULL,
    `departmentId` INTEGER NULL,
    `topic` VARCHAR(15) NOT NULL,
    `text` TEXT NOT NULL,
    `status` ENUM('OPEN', 'PROCESS', 'PAUSED', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `feedback` VARCHAR(100) NULL,
    `city` VARCHAR(50) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`statementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatementMessage` (
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `text` VARCHAR(200) NOT NULL,
    `isVictim` BOOLEAN NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Volunteer` ADD CONSTRAINT `Volunteer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerQualification` ADD CONSTRAINT `VolunteerQualification_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `Volunteer`(`volunteerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerQualification` ADD CONSTRAINT `VolunteerQualification_qualificationId_fkey` FOREIGN KEY (`qualificationId`) REFERENCES `Qualification`(`qualificationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerDepartment` ADD CONSTRAINT `VolunteerDepartment_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `Volunteer`(`volunteerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerDepartment` ADD CONSTRAINT `VolunteerDepartment_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdministratorDepartment` ADD CONSTRAINT `AdministratorDepartment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Administrator`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdministratorDepartment` ADD CONSTRAINT `AdministratorDepartment_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Victim` ADD CONSTRAINT `Victim_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DepartmentResource` ADD CONSTRAINT `DepartmentResource_resourceId_fkey` FOREIGN KEY (`resourceId`) REFERENCES `Resource`(`resourceId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DepartmentResource` ADD CONSTRAINT `DepartmentResource_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_typeOfResourceId_fkey` FOREIGN KEY (`typeOfResourceId`) REFERENCES `TypeOfResource`(`typeOfResourceId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Statement` ADD CONSTRAINT `Statement_victimId_fkey` FOREIGN KEY (`victimId`) REFERENCES `Victim`(`victimId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Statement` ADD CONSTRAINT `Statement_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatementMessage` ADD CONSTRAINT `StatementMessage_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `Statement`(`statementId`) ON DELETE CASCADE ON UPDATE CASCADE;
