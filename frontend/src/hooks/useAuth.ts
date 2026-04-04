import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useAuth } from "../contexts/AuthContext";
import type { LoginDto, RegisterDto } from "../models/auth.model";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: (data) => login(data),
  });
}

export function useRegister() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterDto) => authService.register(data),
    onSuccess: (data) => login(data),
  });
}
