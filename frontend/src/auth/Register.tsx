import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "../schema/auth.schema"
import { api } from "../lib/api"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterInput) {
    try {
      await api.post("/auth/register", data)
      toast.success("Account created successfully")
      navigate("/")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1ec] px-4">
      <Card className="w-full max-w-md shadow-lg border border-[#e5ddd5]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#3e2f25] text-center">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input 
                className="h-11 border-[#d6cfc7] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                placeholder="Full Name" 
                {...register("fullName")} 
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                className="h-11 border-[#d6cfc7] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                placeholder="Email" 
                {...register("email")} />
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
              {isSubmitting ? "Creating..." : "Register"}
            </Button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/" className="text-[#6f4e37] hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}