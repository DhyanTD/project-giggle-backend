import { Settings } from "@smoke-trees/postgres-backend";

export class ApplicationSettings extends Settings {
  databaseType: "postgres" | "mysql";
  dbPassword: string;
  dbUser: string;
  dbHost: string;
  dbPort: string | undefined;
  database: string;
  jwtSecret: string;
  jwtTokenExpiry: number;
  jwtRefreshExpiry: number;

  constructor() {
    super();
    this.databaseType = "postgres";
    this.dbPassword = this.getValue("PGPASSWORD", "mysecretpassword");
    this.dbUser = this.getValue("PGUSER", "postgres");
    this.dbHost = this.getValue("PGHOST", "localhost");
    this.dbPort = this.getValue("PGPORT", "5432");
    this.database = this.getValue("PGDATABASE", "projectsDB");
    this.jwtSecret = this.getValue("JWT_SECRET", "broitissupposedtobesecret");
    this.jwtTokenExpiry = parseInt(this.getValue("JWT_TOKEN_EXPIRY", "3600"));
    this.jwtRefreshExpiry = parseInt(this.getValue("JWT_REFRESH_EXPIRY", "86400"));
  }
}

const settings = new ApplicationSettings();

export default settings;
