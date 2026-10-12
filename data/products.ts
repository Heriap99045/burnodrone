export interface Product {
  id: string;
  name: string;
  category: string;
  specs: string;
  price: string;
  image: string;
  affiliateUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "CUAV V5+ Flight Controller",
    category: "Flight Controller",
    specs: "Autopilot board running ArduPilot / PX4 for UAV & Multirotor",
    price: "Rp 4.500.000",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopee.co.id",
  },
  {
    id: "2",
    name: "SIYI A8 mini Gimbal Camera",
    category: "Camera & Gimbal",
    specs: "4K Ultra HD 3-Axis Gimbal Camera with MAVLink & RTSP Stream",
    price: "Rp 3.200.000",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopee.co.id",
  },
  {
    id: "3",
    name: "Emlid Reach M2 RTK Receiver",
    category: "GPS & Navigation",
    specs: "Multi-band RTK GNSS module for precise PPK/RTK aerial mapping",
    price: "Rp 8.750.000",
    image:
      "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopee.co.id",
  },
  {
    id: "4",
    name: "MKS HV6160 DroneCAN Servo",
    category: "Actuators",
    specs: "High torque brushless CAN bus servo for heavy VTOL surfaces",
    price: "Rp 1.150.000",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopee.co.id",
  },
];
