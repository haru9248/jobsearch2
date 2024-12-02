class JobsController < ApplicationController

  def index
    jobs = Job.includes(:category)

    if params[:categories].present?
      category_ids = params[:categories].map(&:to_i)
      Rails.logger.debug("Category IDs: #{category_ids}")
      jobs = jobs.where(category_id: category_ids)
    end

    if params[:salary].present?
      jobs = jobs.where('salary >= ?', params[:salary].to_i)
    end

    jobs_count = jobs.count

    per_page = (params[:per_page] || 10).to_i
    page = (params[:page] || 1).to_i

    paginated_jobs = jobs.offset((page - 1) * per_page).limit(per_page)

    render json: { jobs: paginated_jobs.as_json(include: :category),
    total_count: jobs_count, # フィルタ後の全件数
    current_page: page,
    total_pages: (jobs_count.to_f / per_page).ceil}
  end

  def create
    job = Job.new(job_params)
    if job.save
      render json: job, status: :created
    else
      render json: { errors: job.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    job = Job.find(params[:id])
    render json: job.as_json(include: :category)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "job not found" }, status: :not_found
  end

  def update
    job = Job.find(params[:id])
    if job.update(job_params)
      render json: job
    else
      render json: { errors: job.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Job not found" }, status: :not_found
  end

  def destroy
    job = Job.find(params[:id])
    job.destroy
    render json: { message: "Job deleted successfully" }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Job not found" }, status: :not_found
  end

  private

  def job_params
    params.require(:job).permit(:title, :salary, :category_id)
  end
end
