import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "../utils/auth.schema"
import { api } from "../lib/api"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    try {
      await api.post("/auth/login", data)
      toast.success("Welcome back")
      navigate("/dashboard")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1ec] px-4">
      <Card className="w-full max-w-md shadow-lg border border-[#e5ddd5]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#3e2f25] text-center">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input 
                className="h-11 border-[#d6cfc7] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                placeholder="Email" 
                {...register("email")} 
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                className="h-11 border-[#d6cfc7] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="w-full bg-[#6f4e37] hover:bg-[#5c402d] text-white"
              disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-center">
              No account?{" "}
              <Link to="/register" className="text-[#6f4e37] hover:underline font-medium">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}