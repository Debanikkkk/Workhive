export interface JWTTokenData {
  id: number;
  // oem: number;
  // workshop?: number;
  // workshopGroup?: number;
  // region?: number;
  // subOem?: number;
  company: number,
  branch: number,
  department: number,
  role: { permissions: string[] };
}
