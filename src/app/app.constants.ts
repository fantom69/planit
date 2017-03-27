export class AppConstants {
   public static getApiURL(): string { 
       return 'planitBO/services'; 
   }

   public static getUnauthorizedAccessURL() : string {
       return '/login';
   }

   public static getCreationCompteAccessURL() : string{
       return '/creation';
   }
}