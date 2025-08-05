import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// MODELOS
import RoleModel from './role.model.js';
import BranchModel from './branch.model.js';
import UserModel from './user.model.js';
import VehicleModel from './vehicle.model.js';
import SaleModel from './sales.model.js';
import CommissionPeriodModel from './commission_period.model.js';
import CommissionModel from './commission.model.js';
import CommissionDetailModel from './commission_detail.model.js';
import ActivityLogModel from './activity_log.model.js';

// INIT MODELS
const Role = RoleModel(sequelize, DataTypes);
const Branch = BranchModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Vehicle = VehicleModel(sequelize, DataTypes);
const Sale = SaleModel(sequelize, DataTypes);
const CommissionPeriod = CommissionPeriodModel(sequelize, DataTypes);
const Commission = CommissionModel(sequelize, DataTypes);
const CommissionDetail = CommissionDetailModel(sequelize, DataTypes);
const ActivityLog = ActivityLogModel(sequelize, DataTypes);

// RELACIONES

// Usuario -> Role
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Usuario -> Branch
Branch.hasMany(User, { foreignKey: 'branchId' });
User.belongsTo(Branch, { foreignKey: 'branchId' });

// Venta -> Usuario
User.hasMany(Sale, { foreignKey: 'userId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

// Venta -> Vehículo
Vehicle.hasMany(Sale, { foreignKey: 'vehicleId' });
Sale.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

// Venta -> Sede (por redundancia/filtro rápido)
Branch.hasMany(Sale, { foreignKey: 'branchId' });
Sale.belongsTo(Branch, { foreignKey: 'branchId' });

// Comisión -> Usuario
User.hasMany(Commission, { foreignKey: 'userId' });
Commission.belongsTo(User, { foreignKey: 'userId' });

// Comisión -> Periodo
CommissionPeriod.hasMany(Commission, { foreignKey: 'periodId' });
Commission.belongsTo(CommissionPeriod, { foreignKey: 'periodId' });

// Comisión -> Detalles
Commission.hasMany(CommissionDetail, { foreignKey: 'commissionId' });
CommissionDetail.belongsTo(Commission, { foreignKey: 'commissionId' });

// Detalle -> Vehículo
Vehicle.hasMany(CommissionDetail, { foreignKey: 'vehicleId' });
CommissionDetail.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

// Log -> Usuario (quien hizo la acción)
User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

export {
  sequelize,
  Role,
  Branch,
  User,
  Vehicle,
  Sale,
  CommissionPeriod,
  Commission,
  CommissionDetail,
  ActivityLog,
};
