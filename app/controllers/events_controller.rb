class EventsController < ApplicationController
  def index
    # render json: Event.first
    render json: {result: :ok}
  end

  def create
  end
end
