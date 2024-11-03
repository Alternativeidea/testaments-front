interface DashboardTemplateProps {
    children: React.ReactNode
}
export default function DashboardTemplate({ children }: DashboardTemplateProps) {
    return (
        <div className="template w-full flex flex-col flex-auto animate-in fade-in slide-in-from-bottom-5 duration-700 ease-in-out">
            {children}
        </div>
    )
}
